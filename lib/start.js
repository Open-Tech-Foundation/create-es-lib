const path = require('path');
const createLib = require('./createLib');
const promptQuestions = require('./createLib/promptQuestions');
const success = require('./display/success');
const getStarted = require('./display/getStarted');
const error = require('./utils/error');

module.exports = async cmd => {
  const libName = cmd.split('/').pop();
  const params = await promptQuestions(libName);

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
