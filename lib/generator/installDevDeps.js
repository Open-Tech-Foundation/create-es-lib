const path = require('path');
const ora = require('ora');

const execAsync = require('../utils/execAsync');
const error = require('../utils/error');

module.exports = async (projectPath, libType, pkgManager) => {
  const spinner = ora('Installing dev dependencies').start();
  let devPkgs = ['eslint@latest', 'prettier@latest'];

  if (libType === 'Module') {
    devPkgs = [
      ...devPkgs,
      'rollup@latest',
      'rollup-plugin-size-snapshot@latest',
    ];
  }

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
