const path = require('path');
const { execSync } = require('child_process');
const ora = require('ora');

const error = require('../utils/error');

module.exports = async (projectPath, pkgManager) => {
  const spinner = ora('Installing dev dependencies').start();

  const cmd =
    pkgManager.cmd === 'npm' ? 'npm install --save-dev' : 'yarn add --dev';

  try {
    execSync(`${cmd} eslint@latest prettier@latest`, {
      cwd: path.join(process.cwd(), projectPath),
      stdio: 'ignore',
    });
    spinner.succeed(`Dev dependencies installed`);
  } catch (er) {
    spinner.fail('Dev dependencies installation failed');
    error(er.message);
  }
};
