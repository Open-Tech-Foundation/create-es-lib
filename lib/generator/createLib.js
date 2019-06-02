const ora = require('ora');
const path = require('path');
const execa = require('execa');

const copyCompileFiles = require('./copyCompileFiles');
const installDevDeps = require('./installDevDeps');
const commitToGit = require('./commitToGit');

module.exports = async (projectPath, params) => {
  const destPath = path.join(process.cwd(), projectPath);

  // Create lib from templates
  const copySpinner = ora('Copying template').start();
  await copyCompileFiles(destPath, params);
  copySpinner.succeed(`Copied templates to ${destPath}`);

  // Install dev deps
  const depsSpinner = ora('Installing dev dependencies').start();
  await installDevDeps(destPath, params.libType, params.pkgManager);
  depsSpinner.succeed(`Dev dependencies installed`);

  // Init eslint
  if (params.eslintInit) {
    await execa(`${params.pkgManager.exe} eslint --init`, {
      cwd: destPath,
      shell: true,
      stdio: 'inherit',
    });
  }

  // Add Initial Commit to git
  const gitSpinner = ora('Commiting to git').start();
  await commitToGit(params, projectPath);
  gitSpinner.succeed(`Files commited to git`);
};
