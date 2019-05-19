const path = require('path');
const { spawnSync } = require('child_process');

module.exports = async (projectPath, packageManager) => {
  spawnSync(`${packageManager} eslint`, ['--init'], {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'inherit',
    shell: true,
  });
};
