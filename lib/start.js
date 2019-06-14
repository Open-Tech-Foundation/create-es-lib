const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');

const questions = require('./questions');
const compileToCopyFiles = require('./createLib/compileToCopyFiles');
const success = require('./views/success');
const getStarted = require('./views/getStarted');
const error = require('./utils/error');
const installDevDeps = require('./installDevDeps');
const commitToGit = require('./commitToGit');

module.exports = async cmd => {
  const libName = cmd.split('/').pop();
  const destPath = path.join(process.cwd(), cmd);

  // Prompt user requirements
  const params = await inquirer.prompt(questions(libName));

  // Create library
  const copySpinner = ora('Creating lib from templates').start();
  try {
    await compileToCopyFiles(destPath, params);
    copySpinner.succeed(`Templates copied to ${destPath}`);
  } catch (err) {
    error(err.message);
  }

  // Install dev deps
  const depsSpinner = ora('Installing dev dependencies').start();
  try {
    await installDevDeps(destPath, params.libType, params.pkgManager);
    depsSpinner.succeed(`Dev dependencies installed`);
  } catch (err) {
    error(err.message);
  }

  // Add Initial Commit to git
  const gitSpinner = ora('Commiting to git').start();
  try {
    await commitToGit(params, destPath);
    gitSpinner.succeed(`Files commited to git`);
  } catch (err) {
    error(err.message);
  }

  // Show getting started info
  console.log('\n');
  success(libName);
  getStarted(cmd, params.libType, params.pkgManager);
};
