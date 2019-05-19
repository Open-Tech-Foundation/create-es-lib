const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

const error = require('../utils/error');

module.exports = async (projectPath, packageManager) => {
  const eslintResult = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'eslintInit',
      message: 'Would you like to config eslint now?',
    },
  ]);

  if (eslintResult.eslintInit) {
    try {
      execSync(`${packageManager.exe} eslint --init`, {
        cwd: path.join(process.cwd(), projectPath),
        stdio: 'inherit',
      });
    } catch (er) {
      error(er.message);
    }
  }
};
