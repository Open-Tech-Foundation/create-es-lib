const path = require('path');
const ora = require('ora');

const execAsync = require('../utils/execAsync');
const error = require('../utils/error');

module.exports = async (params, projectPath) => {
  const spinner = ora('Commiting to git').start();

  try {
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
    spinner.succeed(`Files commited to git`);
  } catch (er) {
    spinner.fail('Git failed');
    error(er.message);
  }
};
