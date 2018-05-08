const path = require('path');

const JEST_PHABRICATOR_REPORT_OUTPUT = 'unit-test-phabricator-report.json';

module.exports = {
  ENVIRONMENT_CONFIG_MAP: {
    // Would display the ancestors of a given tests
    // ANCESTOR'NAME > ANCESTOR'S NAME >  TEST
    SEPARATOR: ' ',
    POST_PROCESSOR: '',
    // report's oputput path
    JEST_PHABRICATOR_REPORT_OUTPUT,
    // required for producing a valid report.
    buildTargetPHID: '',
    // in case we want to trim the paht name (on the report).
    trimBasePath: false,
  },
  DEFAULT_OPTIONS: {
    output: path.join(process.cwd(), `./${JEST_PHABRICATOR_REPORT_OUTPUT}`),
  },
};
