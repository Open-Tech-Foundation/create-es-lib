const handlebars = require('handlebars');
const fs = require('fs');

module.exports = (params, filePath, destFilePath) => {
  const template = handlebars.compile(fs.readFileSync(filePath, 'utf8'));
  const { packageKeywords } = params;
  const keywords = packageKeywords.trim() === '' ? [] : packageKeywords.split(',').map(t => t.trim());
  const content = template({ ...params, packageKeywords: keywords });
  fs.writeFileSync(destFilePath, content, 'utf8');
};
