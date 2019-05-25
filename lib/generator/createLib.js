const path = require('path');
const globby = require('globby');
const camelCase = require('camelcase');

const copyFile = require('./copyFile');
const compileFile = require('./compileFile');

module.exports = async (destPath, params) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    params.libType.toLowerCase(),
  );
  const compiledFiles = ['package.json', 'README.md'];
  const ignoreCopyFiles = compiledFiles.map(f => `**/${f}`);
  const copyFiles = await globby([templatePath], {
    dot: true,
    ignore: [...ignoreCopyFiles, '**/LICENSE'],
  });

  copyFiles.forEach(file => {
    copyFile(file, path.join(destPath, path.relative(templatePath, file)));
  });

  compiledFiles.forEach(file => {
    compileFile(
      { ...params, camelLibName: camelCase(params.pkgName) },
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
};
