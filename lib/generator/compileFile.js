const handlebars = require('handlebars');
const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const convertStrToArr = require('../utils/convertStrToArr');

module.exports = (params, filePath, destFilePath) => {
  const pkgKeywords = convertStrToArr(params.pkgKeywords);
  handlebars.registerHelper('ifEq', (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  const template = handlebars.compile(readFileSync(filePath, 'utf8'));
  const content = template({ ...params, pkgKeywords });

  mkdirSync(path.dirname(destFilePath), { recursive: true });
  writeFileSync(destFilePath, content, 'utf8');

  if (['.js', '.css', '.md', '.json'].includes(path.extname(filePath))) {
    execSync(
      `${
        params.pkgManager.exe
      } prettier --no-config --single-quote --trailing-comma es5 --write "${destFilePath}"`,
      {
        stdio: 'ignore',
        cwd: path.join(__dirname, '..', '..'),
      },
    );
  }
};
