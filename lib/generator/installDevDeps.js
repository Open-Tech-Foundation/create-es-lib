const path = require('path');
const { execSync } = require('child_process');
const ora = require('ora');

const error = require('../utils/error');

module.exports = async (projectPath, packageManager) => {
  const spinner = ora('Installing dev dependencies').start();

  try {
    execSync(
      `${packageManager.cmd} install --save-dev eslint@latest prettier@latest`,
      {
        cwd: path.join(process.cwd(), projectPath),
        stdio: 'ignore',
      },
    );
    spinner.succeed(`Dev dependencies installed`);
  } catch (er) {
    spinner.fail('Dev dependencies installation failed');
    error(er.message);
  }
};
