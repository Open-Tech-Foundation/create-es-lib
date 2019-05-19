const path = require('path');
const { spawnSync } = require('child_process');

module.exports = async projectPath => {
  spawnSync('npx eslint', ['--init'], {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'inherit',
    shell: true,
  });
};
