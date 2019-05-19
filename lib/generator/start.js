const chalk = require('chalk');
const emoji = require('node-emoji');

const promptQuestions = require('./promptQuestions');
const createLib = require('./createLib');
const initESLint = require('./initESLlint');

module.exports = async projectPath => {
  const libName = projectPath.split('/').pop();
  const params = await promptQuestions(libName);

  await createLib(projectPath, params);
  await initESLint(projectPath, params.packageManager);

  console.log(
    '\n',
    emoji.get('tada'),
    `Your library "${chalk.green(libName)}" has been created successfully! \n`,
  );
};
