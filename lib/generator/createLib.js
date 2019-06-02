const ora = require('ora');
const path = require('path');
const execa = require('execa');

const copyCompileFiles = require('./copyCompileFiles');
const installDevDeps = require('./installDevDeps');
const commitToGit = require('./commitToGit');
const error = require('../utils/error');

module.exports = async (projectPath, params) => {
  const destPath = path.join(process.cwd(), projectPath);

  // Create lib from templates
  const copySpinner = ora('Copying template').start();
  try {
    await copyCompileFiles(destPath, params);
    copySpinner.succeed(`Copied templates to ${destPath}`);
  } catch (er) {
    copySpinner.fail('Failed to copy templates');
    error(er.message);
  }

  // Install dev deps
  const depsSpinner = ora('Installing dev dependencies').start();
  try {
    await installDevDeps(destPath, params.libType, params.pkgManager);
    depsSpinner.succeed(`Dev dependencies installed`);
  } catch (er) {
    depsSpinner.fail('Dev dependencies installation failed');
    error(er.message);
  }

  // Init eslint
  if (params.eslintInit) {
    try {
      await execa(`${params.pkgManager.exe} eslint --init`, {
        cwd: destPath,
        shell: true,
        stdio: 'inherit',
      });
    } catch (er) {
      error(er.message);
    }
  }

  // Add Initial Commit
  const gitSpinner = ora('Commiting to git').start();
  try {
    await commitToGit(params, projectPath);
    gitSpinner.succeed(`Files commited to git`);
  } catch (er) {
    gitSpinner.fail('Git failed');
    error(er.message);
  }
};
