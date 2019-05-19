const chalk = require('chalk');
const emoji = require('node-emoji');

const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const initESLint = require('./initESLint');
const installDevDeps = require('./installDevDeps');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();

  const params = await promptQuestions(libName);
  await createLib(projectPath, params);
  await installDevDeps(projectPath, params.pkgManager);
  await initESLint(projectPath, params.pkgManager);

  console.log(
    '\n',
    emoji.get('tada'),
    `Your library "${chalk.bold.green(
      libName,
    )}" has been created successfully! \n`,
  );
};
