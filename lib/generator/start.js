const inquirer = require('inquirer');
const chalk = require('chalk');
const emoji = require('node-emoji');

const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const initEslint = require('./initEslint');
const error = require('../utils/error');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await promptQuestions(libName);

  try {
    await createLib(projectPath, params);
  } catch (er) {
    error(er.message);
  }

  const eslintResult = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'eslintInit',
      message: 'Would you like to config eslint now?',
    },
  ]);

  if (eslintResult.eslintInit) {
    try {
      await initEslint(projectPath, params.packageManager);
    } catch (er) {
      error(er.message);
    }
  }

  console.log(
    '\n',
    emoji.get('tada'),
    `Your library "${chalk.green(libName)}" has been created successfully! \n`,
  );
};
