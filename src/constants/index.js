const path = require('path');

const JEST_PHABRICATOR_REPORT_OUTPUT = 'unit-test-phabricator-report.json';

module.exports = {
  ENVIRONMENT_CONFIG_MAP: {
    SEPARATOR: ' ',
    POST_PROCESSOR: '',
    JEST_PHABRICATOR_REPORT_OUTPUT,
    buildTargetPHID: '',
  },
  DEFAULT_OPTIONS: {
    output: path.join(process.cwd(), `./${JEST_PHABRICATOR_REPORT_OUTPUT}`),
  },
};
