const path = require('path');
const inquirer = require('inquirer');

const questions = require('./questions');
const createLib = require('./createLib');
const success = require('./views/success');
const getStarted = require('./views/getStarted');
const error = require('./utils/error');

module.exports = async cmd => {
  const libName = cmd.split('/').pop();

  // Prompt user requirements
  const params = await inquirer.prompt(questions(libName));

  // Create library
  try {
    const destPath = path.join(process.cwd(), cmd);
    await createLib(destPath, params);
  } catch (err) {
    error(err.message);
  }

  // Show getting started info
  console.log('\n');
  success(libName);
  getStarted(cmd, params.libType, params.pkgManager);
};
