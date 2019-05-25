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
  const spinner = ora('Copying template').start();
  try {
    await createLib(destPath, params);
    spinner.succeed(`Copied templates to ${destPath}`);
  } catch (er) {
    spinner.fail('Failed to copy templates');
    error(er.message);
  }

  await installDevDeps(projectPath, params.libType, params.pkgManager);
  await initESLint(params, projectPath);
  await commitToGit(params, projectPath);
  console.log('\n');
  success(libName);
  getStarted(projectPath, params.libType, params.pkgManager);
};
