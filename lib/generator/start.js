const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const questions = require('./questions');
const createCLILib = require('./createCLILib');
const createModuleLib = require('./createModuleLib');
const error = require('../utils/error');

module.exports = async (projectName) => {
  const params = await inquirer.prompt(questions(projectName));

  try {
    fs.mkdirSync(path.join(process.cwd(), projectName));
  } catch (e) {
    error(e.message);
  }

  if (params.libType === 'CLI') {
    createCLILib(projectName, params);
  } else {
    createModuleLib(params);
  }
};
