const shell = require('shelljs');
const logSymbols = require('log-symbols');

module.exports = (name) => {
  shell.mkdir(name);
  console.log(logSymbols.success, 'Done!');
};
