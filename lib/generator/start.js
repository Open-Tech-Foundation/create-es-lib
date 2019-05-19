const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const questions = require('./questions');
const createLib = require('./createLib');
const error = require('../utils/error');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await inquirer.prompt(questions(libName));

  try {
    fs.mkdirSync(path.join(process.cwd(), projectPath), { recursive: true });
  } catch (e) {
    error(e.message);
  }

  await createLib(projectPath, params);

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
        cwd: path.join(process.cwd(), projectPath),
        stdio: 'inherit',
        shell: true,
      });
    } catch (er) {
      error(er.message);
    }
  }
};
