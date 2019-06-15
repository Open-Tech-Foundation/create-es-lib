const path = require('path');
const globby = require('globby');
const camelCase = require('camelcase');
const pMap = require('p-map');
const { writeFile, mkdir } = require('fs');
const { promisify } = require('util');

const compileFile = require('./compileFile');
const beautify = require('./beautify');

const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);

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

  const mapper = async file => {
    const destFilePath = path.join(destPath, path.basename(file));
    const content = await compileFile(
      { ...params, camelLibName: camelCase(params.pkgName) },
      file,
    );
    await mkdirAsync(path.dirname(destFilePath), { recursive: true });
    await writeFileAsync(destFilePath, content, {
      encoding: 'utf8',
    });
    beautify(content, destFilePath);
  };

  return pMap(filePaths, mapper, { concurrency: 2 });
};
