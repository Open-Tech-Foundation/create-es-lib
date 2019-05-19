const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const initESLint = require('./initESLint');
const installDevDeps = require('./installDevDeps');
const success = require('../display/success');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await promptQuestions(libName);
  console.log('\n');
  await createLib(projectPath, params);
  await installDevDeps(projectPath, params.pkgManager);
  console.log('\n');
  await initESLint(params, projectPath);
  console.log('\n');
  success(libName);
};
