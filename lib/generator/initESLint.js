const path = require('path');
const { execSync } = require('child_process');

const error = require('../utils/error');

module.exports = async (params, projectPath) => {
  if (params.eslintInit) {
    try {
      execSync(`${params.pkgManager.exe} eslint --init`, {
        cwd: path.join(process.cwd(), projectPath),
        stdio: 'inherit',
      });
    } catch (er) {
      error(er.message);
    }
  }
};
