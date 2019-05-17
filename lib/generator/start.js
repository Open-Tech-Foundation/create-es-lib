const inquirer = require('inquirer');
const questions = require('./questions');
const createCLILib = require('./createCLILib');
const createModuleLib = require('./createModuleLib');

module.exports = async (projectName) => {
  const params = await inquirer.prompt(questions(projectName));
  if (params.libType === 'CLI') {
    createCLILib(params);
  } else {
    createModuleLib(params);
  }
};
