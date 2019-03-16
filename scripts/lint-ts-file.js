/* eslint-disable @typescript-eslint/no-var-requires, deprecate/member-expression */

'use strict';

const { exec } = require('child_process');
const fs = require('fs');

const configJson = require('../tsconfig.json');

const CONFIG_FILE_NAME = './tsconfig.lint.json';

const fileToLint = process.argv[2];

const nextJson = {
  ...configJson,
  files: [fileToLint],
};

const data = JSON.stringify(nextJson, null, 2);

fs.writeFileSync(CONFIG_FILE_NAME, data);

exec(`tsc --noEmit --pretty -p ${CONFIG_FILE_NAME}`, (err, stdout, stderr) => {
  fs.unlinkSync(CONFIG_FILE_NAME);
  if (err) {
    console.error(stdout);
    throw err;
  }
});
