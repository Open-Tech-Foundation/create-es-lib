const path = require('path');
const globby = require('globby');
const camelCase = require('camelcase');

const compileFile = require('./compileFile');

module.exports = async (destPath, params) => {
  const templatePath = path.join(__dirname, '..', 'templates');
  const libPath = path.join(templatePath, params.libType.toLowerCase());
  const licensePath = path.join(
    templatePath,
    'licenses',
    params.license,
    'LICENSE',
  );
  const filePaths = await globby([libPath, licensePath], {
    dot: true,
  });

  if (filePaths.length === 0) {
    throw new Error('Templates not found');
  }

  filePaths.forEach(file => {
    compileFile(
      { ...params, camelLibName: camelCase(params.pkgName) },
      file,
      path.join(destPath, path.basename(file)),
    );
  });
};
