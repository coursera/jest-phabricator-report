jest.mock('fs');
jest.mock('mkdirp');

const fs = require('fs');
const path = require('path');

const testResultProcessor = require('../');
const constants = require('../constants/');

describe('jest-phabricator-report', () => {
  it('should generate valid json', () => {
    const noFailingTestsReport = require('../__mocks__/no-failing-tests.json');

    process.env.buildTargetPHID = 'XXXX';
    const result = testResultProcessor(noFailingTestsReport);

    // Ensure fs.writeFileSync is called
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

    // Ensure file would have been generated
    expect(fs.writeFileSync).toHaveBeenLastCalledWith(
      path.resolve(constants.DEFAULT_OPTIONS.output),
      expect.any(String)
    );

    expect(result).toMatchSnapshot();
  });
});
