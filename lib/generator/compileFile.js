const handlebars = require('handlebars');
const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');

module.exports = (params, filePath, destFilePath) => {
  mkdirSync(path.dirname(destFilePath), { recursive: true });

  const template = handlebars.compile(readFileSync(filePath, 'utf8'));
  const { packageKeywords } = params;
  const keywords =
    packageKeywords.trim() === ''
      ? []
      : packageKeywords.split(',').map(t => t.trim());
  const content = template({ ...params, packageKeywords: keywords });
  writeFileSync(destFilePath, content, 'utf8');
};
