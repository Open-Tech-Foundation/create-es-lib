const path = require('path');
const { execSync } = require('child_process');

module.exports = async (projectPath, packageManager) => {
  console.log(path.join(process.cwd(), projectPath));

  execSync(`${packageManager.exe} eslint --init`, {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'inherit',
  });
};
