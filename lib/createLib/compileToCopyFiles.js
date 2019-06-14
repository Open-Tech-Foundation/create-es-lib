const path = require('path');
const globby = require('globby');
const camelCase = require('camelcase');

const compileFile = require('./compileFile');

module.exports = async (destPath, params) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    params.libType.toLowerCase(),
  );
  const filePaths = await globby([templatePath], {
    dot: true,
  });

  filePaths.forEach(file => {
    compileFile(
      { ...params, camelLibName: camelCase(params.pkgName) },
      path.join(templatePath, file),
      path.join(destPath, file),
    );
  });
};
