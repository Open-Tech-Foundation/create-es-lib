const path = require('path');
const util = require('util');
const { exec } = require('child_process');
const ora = require('ora');

const execAsync = util.promisify(exec);

const error = require('../utils/error');

module.exports = async (projectPath, pkgManager) => {
  const spinner = ora('Installing dev dependencies').start();
  const devPkgs = ['eslint@latest', 'prettier@latest'];

  let cmd;
  if (pkgManager.cmd === 'npm') {
    cmd = `npm install --save-dev ${devPkgs.join(' ')}`;
  } else {
    cmd = `yarn add ${devPkgs.join(' ')} --dev `;
  }

  try {
    await execAsync(cmd, {
      cwd: path.join(process.cwd(), projectPath),
      stdio: 'ignore',
    });
    spinner.succeed(`Dev dependencies installed`);
  } catch (er) {
    spinner.fail('Dev dependencies installation failed');
    error(er.message);
  }
};
