const inquirer = require('inquirer');
const questions = require('./questions');

module.exports = async libName => {
  const params = await inquirer.prompt(questions(libName));
  return params;
};
