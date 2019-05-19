const path = require('path');
const globby = require('globby');
const ora = require('ora');

const copyFile = require('./copyFile');
const compileFile = require('./compileFile');
const error = require('../utils/error');

module.exports = async (projectPath, params) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    params.libType.toLowerCase(),
  );
  const destPath = path.join(process.cwd(), projectPath);
  const compiledFiles = ['package.json', 'README.md'];
  const ignoreCopyFiles = compiledFiles.map(f => `**/${f}`);
  const copyFiles = await globby([templatePath], {
    dot: true,
    ignore: [...ignoreCopyFiles, '**/LICENSE'],
  });

  const spinner = ora('Copying template').start();
  try {
    copyFiles.forEach(file => {
      copyFile(file, path.join(destPath, path.relative(templatePath, file)));
    });

    compiledFiles.forEach(file => {
      compileFile(
        params,
        path.join(templatePath, file),
        path.join(destPath, file),
      );
    });

    if (params.license === 'MIT') {
      compileFile(
        params,
        path.join(templatePath, 'LICENSE'),
        path.join(destPath, 'LICENSE'),
      );
    }
    spinner.succeed(`Copied templates to ${destPath}`);
  } catch (er) {
    spinner.fail('Failed to copy templates');
    error(er.message);
  }
};
