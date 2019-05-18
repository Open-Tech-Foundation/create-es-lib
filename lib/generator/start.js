const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const questions = require('./questions');
const createLib = require('./createLib');
const error = require('../utils/error');

module.exports = async projectName => {
  const params = await inquirer.prompt(questions(projectName));

  try {
    fs.mkdirSync(path.join(process.cwd(), projectName));
  } catch (e) {
    error(e.message);
  }

  await createLib(projectName, params);

  const eslintResult = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'eslintInit',
      message: 'Would you like to config eslint now?',
    },
  ]);

  if (eslintResult.eslintInit) {
    try {
      spawnSync('npx eslint', ['--init'], {
        cwd: path.join(process.cwd(), projectName),
        stdio: 'inherit',
        shell: true,
      });
    } catch (er) {
      error(er.message);
    }
  }
};
