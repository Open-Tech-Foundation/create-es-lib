const path = require('path');

const execAsync = require('../utils/execAsync');

module.exports = async (params, projectPath) => {
  await execAsync('git init && git add --all', {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'ignore',
  });
  await execAsync(`git config --local user.name "${params.authorFullName}"`, {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'ignore',
  });
  await execAsync(`git config --local user.email "${params.authorEmail}"`, {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'ignore',
  });
  await execAsync(`git commit -m "Initial commit"`, {
    cwd: path.join(process.cwd(), projectPath),
    stdio: 'ignore',
  });
};
