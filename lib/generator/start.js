const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const initESLint = require('./initESLint');
const installDevDeps = require('./installDevDeps');
const commitToGit = require('./commitToGit');
const success = require('../display/success');
const getStarted = require('../display/getStarted');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await promptQuestions(libName);
  console.log('\n');
  await createLib(projectPath, params);
  await installDevDeps(projectPath, params.libType, params.pkgManager);
  await initESLint(params, projectPath);
  await commitToGit(params, projectPath);
  console.log('\n');
  success(libName);
  getStarted(projectPath);
};
