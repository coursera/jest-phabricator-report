import buildJsonResults from '../utils/buildJsonResults';
import constants from '../constants/index';

describe('buildJsonResults', () => {
  it('should contain global result of the TestsSuits', () => {
    const noFailingTestsReport = require('../__mocks__/no-failing-tests.json');
    const jsonResults = buildJsonResults(noFailingTestsReport, {
      ...constants.DEFAULT_OPTIONS,
      buildTargetPHID: 'XXXX',
    });
    expect(jsonResults.type).toMatchSnapshot();
  });

  it('should contain the correct shape for unit key', () => {
    const noFailingTestsReport = require('../__mocks__/no-failing-tests.json');
    const jsonResults = buildJsonResults(noFailingTestsReport, {
      ...constants.DEFAULT_OPTIONS,
      buildTargetPHID: 'XXXX',
    });

    expect(jsonResults.unit).toMatchSnapshot();
  });

  it('should fail if buildTargetPHID is not defined', () => {
    const noFailingTestsReport = require('../__mocks__/no-failing-tests.json');

    expect(() => buildJsonResults(noFailingTestsReport, constants.DEFAULT_OPTIONS)).toThrowErrorMatchingSnapshot();
  });

  it('should expand when errors are found', () => {
    const failingTestsReport = require('../__mocks__/failing-tests.json');
    const jsonResults = buildJsonResults(failingTestsReport, {
      ...constants.DEFAULT_OPTIONS,
      buildTargetPHID: 'XXXX',
    });

    expect(jsonResults).toMatchSnapshot();
  });
});
