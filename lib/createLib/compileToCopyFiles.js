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

module.exports = async (destPath, params, options = []) => {
  const templatePath = path.join(__dirname, '..', 'templates');
  const libPath = path.join(templatePath, params.libType.toLowerCase());
  const licensePath = path.join(
    templatePath,
    'licenses',
    params.license,
    'LICENSE',
  );
  const filePaths = await globby([libPath], {
    dot: true,
  });

  if (filePaths.length === 0) {
    throw new Error('Templates not found');
  }

  const mapper = async file => {
    const destFilePath = path.join(destPath, path.relative(libPath, file));
    const content = await compileFile(
      { ...params, camelLibName: camelCase(params.pkgName) },
      file,
    );
    await mkdirAsync(path.dirname(destFilePath), { recursive: true });
    if (options.includes('--verbose')) {
      console.log(`Writing file: ${file}`);
    }
    return writeFileAsync(destFilePath, beautify(content, destFilePath), {
      encoding: 'utf8',
    });
  };

  await pMap(filePaths, mapper, { concurrency: 2 });

  if (params.license) {
    const licContent = await compileFile(params, licensePath);
    await writeFileAsync(path.join(destPath, 'LICENSE'), licContent);
  }
};
