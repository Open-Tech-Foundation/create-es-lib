const path = require('path');
const { mkdirSync, copyFile } = require('fs');
const { promisify } = require('util');

const copyFileAsync = promisify(copyFile);

module.exports = (source, dest) => {
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileAsync(source, dest);
};
