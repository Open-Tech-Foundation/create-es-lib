const ora = require('ora');
const path = require('path');

const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const initESLint = require('./initESLint');
const installDevDeps = require('./installDevDeps');
const commitToGit = require('./commitToGit');
const success = require('../display/success');
const getStarted = require('../display/getStarted');
const error = require('../utils/error');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await promptQuestions(libName);
  console.log('\n');

  const destPath = path.join(process.cwd(), projectPath);
  const copySpinner = ora('Copying template').start();
  try {
    await createLib(destPath, params);
    copySpinner.succeed(`Copied templates to ${destPath}`);
  } catch (er) {
    copySpinner.fail('Failed to copy templates');
    error(er.message);
  }

  const depsSpinner = ora('Installing dev dependencies').start();
  try {
    const cwd = path.join(process.cwd(), projectPath);
    await installDevDeps(cwd, params.libType, params.pkgManager);
    depsSpinner.succeed(`Dev dependencies installed`);
  } catch (er) {
    depsSpinner.fail('Dev dependencies installation failed');
    error(er.message);
  }

  await initESLint(params, projectPath);

  const gitSpinner = ora('Commiting to git').start();
  try {
    await commitToGit(params, projectPath);
    gitSpinner.succeed(`Files commited to git`);
  } catch (er) {
    gitSpinner.fail('Git failed');
    error(er.message);
  }

  console.log('\n');
  success(libName);
  getStarted(projectPath, params.libType, params.pkgManager);
};
