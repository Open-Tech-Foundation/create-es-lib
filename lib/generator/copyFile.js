const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

module.exports = async (source, dest) => {
  await mkdir(path.dirname(dest), { recursive: true });
  copyFile(source, dest);
};
