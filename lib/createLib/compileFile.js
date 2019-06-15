const handlebars = require('handlebars');
const { readFile } = require('fs');
const { promisify } = require('util');

const convertStrToArr = require('../utils/convertStrToArr');

const readFileAsync = promisify(readFile);

module.exports = async (params, filePath) => {
  const pkgKeywords = convertStrToArr(params.pkgKeywords);
  handlebars.registerHelper('ifEq', (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  const buffer = await readFileAsync(filePath, { encoding: 'utf8' });
  const template = handlebars.compile(buffer);
  return template({ ...params, pkgKeywords });
};
