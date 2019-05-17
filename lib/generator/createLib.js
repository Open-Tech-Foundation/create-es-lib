const path = require('path');
const globby = require('globby');
const copyFile = require('./copyFile');

module.exports = async (projectName, params) => {
  const templatePath = path.join(__dirname, '..', 'templates', params.libType.toLowerCase());
  const destPath = path.join(process.cwd(), projectName);
  const compiledFiles = ['package.json', 'README.md'];
  const ignoreCopyFiles = compiledFiles.map(f => `**/${f}`);
  const copyFiles = await globby([templatePath], { dot: true, ignore: ignoreCopyFiles });

  copyFiles.forEach((file) => {
    copyFile(file, path.join(destPath, path.relative(templatePath, file)));
  });
};
