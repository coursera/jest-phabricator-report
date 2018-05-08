const path = require('path');
const fs = require('fs');

const constants = require('../constants/');

function getEnvOptions() {
  return Object.keys(constants.ENVIRONMENT_CONFIG_MAP).reduce(
    (memo, key) => (process.env[key] ? { ...memo, [key]: process.env[key] } : memo),
    {}
  );
}

function getAppOptions(pathToResolve) {
  let traversing = true;

  // Find nearest package.json by traversing up directories until /
  while (traversing) {
    traversing = pathToResolve !== path.sep;

    const pkgpath = path.join(pathToResolve, 'package.json');

    if (fs.existsSync(pkgpath)) {
      let options = (require(pkgpath) || {})['jest-phabricator-report'];

      if (Object.prototype.toString.call(options) !== '[object Object]') {
        options = {};
      } else {
        options.basePath = pathToResolve;
      }

      return options;
    } else {
      pathToResolve = path.dirname(pathToResolve);
    }
  }

  return {};
}

module.exports = {
  options: () => ({ ...constants.DEFAULT_OPTIONS, ...getAppOptions(process.cwd()), ...getEnvOptions() }),
  getAppOptions,
  getEnvOptions,
};
