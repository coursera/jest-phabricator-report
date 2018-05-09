// @flow

type Options = {
  buildTargetPHID: string,
  SEPARATOR: string,
  trimBasePath: string,
  basePath: string,
};
type TestsResults = {
  status: 'passed' | 'failed',
  failureMessages: string[],
  title: string,
  ancestorTitles: string[],
  duration: number,
};

type JestTestSuitesResults = {
  numFailingTests: number,
  numPassingTests: number,
  testFilePath: string,
  numPendingTests: number,
  perfStats: { end: number, start: number },
  testResults: TestsResults[],
};
type JestReport = {
  numFailedTestSuites: number,
  numPassedTests: number,
  numTotalTests: number,
  testResults: JestTestSuitesResults[],
};
type PhabricatorUnitTestResult = {
  name: string,
  path: string,
  result: 'pass' | 'fail',
  namespace: string,
  duration: number,
  details: string,
};

type PhabricatorUnitTestsJestReport = {
  buildTargetPHID: string,
  type: 'pass' | 'fail' | 'work',
  unit: PhabricatorUnitTestResult[],
};

type ReportResult = 'pass' | 'fail';

const PHABRICATOR_JEST_UNIT_RESULTS = {
  passed: 'pass',
  failed: 'fail',
};

function getReportResult({ testResults }): ReportResult {
  const { passed, failed } = PHABRICATOR_JEST_UNIT_RESULTS;

  return testResults.some(({ numFailingTests }) => numFailingTests) ? failed : passed;
}

function getResultsPerSuite(path, testResults: TestsResults[], SEPARATOR): PhabricatorUnitTestResult[] {
  return testResults.map(({ status, duration, failureMessages, title: name, ancestorTitles }) => ({
    path,
    name,
    duration: duration / 1000,
    result: PHABRICATOR_JEST_UNIT_RESULTS[status],
    namespace: ancestorTitles.join(SEPARATOR),
    details: failureMessages.join(''),
  }));
}

function trimPath(path, basePath) {
  return path.replace(basePath, '');
}
function getTestResultForPhabricator({ testResults: testSuitResults }, { SEPARATOR, basePath, trimBasePath }) {
  return testSuitResults.reduce(
    (
      memo,
      { testFilePath: name, testResults: results, numFailingTests, perfStats: { end, start } }: JestTestSuitesResults
    ): PhabricatorUnitTestResult[] => {
      const duration = (end - start) / 1000;
      const result = numFailingTests ? 'fail' : 'pass';
      const path = trimBasePath ? trimPath(name, basePath) : name;
      let summary = [];
      if (result === 'fail') {
        summary = [...summary, ...getResultsPerSuite(path, results, SEPARATOR)];
      } else {
        summary.push({
          // we don't use `path` attribute given that the display on Phabricator is not optimal.
          path,
          result,
          duration,
        });
      }
      return [...memo, ...summary];
    },
    []
  );
}

export default function(report: JestReport, options: Options): PhabricatorUnitTestsJestReport {
  const { buildTargetPHID, SEPARATOR, trimBasePath, basePath } = options;

  if (!buildTargetPHID) {
    throw new Error('buildTargetPHID not present');
  }
  return {
    buildTargetPHID,
    type: getReportResult(report),
    unit: getTestResultForPhabricator(report, { SEPARATOR, trimBasePath, basePath }),
  };
}
