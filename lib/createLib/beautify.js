const path = require('path');
const prettier = require('prettier');

module.exports = (content, destFilePath) => {
  if (['.js', '.json', '.md', '.css'].includes(path.extname(destFilePath))) {
    prettier.format(content, { filepath: destFilePath });
  }
};
