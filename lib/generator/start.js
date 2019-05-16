const inquirer = require('inquirer');
const questions = require('./questions');
const createCLILib = require('./createCLILib');
const createModuleLib = require('./createModuleLib');

module.exports = async (libName) => {
  const params = await inquirer.prompt(questions(libName));
  if (params.libType === 'CLI') {
    createCLILib(params);
  } else {
    createModuleLib(params);
  }
};
