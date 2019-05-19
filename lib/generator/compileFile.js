const handlebars = require('handlebars');
const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const convertStrToArr = require('../utils/convertStrToArr');

module.exports = (params, filePath, destFilePath) => {
  const pkgKeywords = convertStrToArr(params.pkgKeywords);

  const template = handlebars.compile(readFileSync(filePath, 'utf8'));
  const content = template({ ...params, pkgKeywords });

  mkdirSync(path.dirname(destFilePath), { recursive: true });
  writeFileSync(destFilePath, content, 'utf8');

  if (['.js', '.css', '.md', '.json'].includes(path.extname(filePath))) {
    execSync(
      `${params.pkgManager.exe} prettier --no-config --write "${destFilePath}"`,
      {
        stdio: 'ignore',
        cwd: path.join(__dirname, '..', '..'),
      },
    );
  }
};
