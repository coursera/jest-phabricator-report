import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';

import buildJsonResults from './utils/buildJsonResults';
import getOptions from './utils/getOptions';

/*
  At the end of ALL of the test suites this method is called
  It's responsible for generating a single unit-test-report.json file which
  Represents the status of the test runs
  Expected input and workflow documentation here:
  https://facebook.github.io/jest/docs/configuration.html#testresultsprocessor-string
  Intended output (json) documentation here:
  https://secure.phabricator.com/conduit/method/harbormaster.sendmessage/
  unit tests section.
*/
module.exports = (report) => {
  const options = getOptions.options();
  const { output, buildTargetPHID } = options;
  const jsonResults = { ...buildJsonResults(report, options), buildTargetPHID };

  // Ensure output path exists
  mkdirp.sync(path.dirname(output));

  // Write data to file
  fs.writeFileSync(output, JSON.stringify(jsonResults, null, 2));

  return report;
};
