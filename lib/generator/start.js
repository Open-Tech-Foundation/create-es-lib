const inquirer = require('inquirer');
const path = require('path');
const { spawnSync } = require('child_process');
const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const error = require('../utils/error');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await promptQuestions(libName);

  try {
    await createLib(projectPath, params);
  } catch (e) {
    error(e.message);
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
