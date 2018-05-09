#! /usr/bin/env node

/* eslint-disable no-process-env */
/* eslint-disable no-console */
const fs = require('fs');

const exclude = ['main', 'devDependencies', 'scripts', 'eslintConfig', 'babel', 'prettier', 'lint-staged'];

let pkg;
try {
  pkg = require('./package');
} catch (e) {
  throw new Error('package.json not found.', e);
}

const newPkg = Object.entries(pkg).reduce(
  (memo, [key, value]) => {
    if (!exclude.includes(key)) {
      return { ...memo, [key]: pkg[key] };
    }
    return memo;
  },
  { main: 'dist/index.js' }
);

if (process.env.DRY_RUN) {
  console.log(JSON.stringify(newPkg, null, '  '));
} else {
  fs.writeFileSync('dist/package.json', JSON.stringify(newPkg, null, '  '), 'utf-8');
}
