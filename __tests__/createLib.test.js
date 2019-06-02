const path = require('path');
const { existsSync, readFileSync } = require('fs');
const globby = require('globby');
const { tmpdir } = require('os');
const rmfr = require('rmfr');

const createLib = require('../lib/generator/createLib');
const devPkgs = require('../lib/generator/devPkgs');

describe('When invalid params passed', () => {
  test('the empty params fails with an error', async () => {
    expect.assertions(1);
    await expect(createLib('', {})).rejects.toThrow();
  });

  test('the invalid lib type fails with an error', async () => {
    expect.assertions(1);
    await expect(
      createLib('cool-lib-cli', { libType: 'browser' }),
    ).rejects.toThrow();
  });
});

describe('When valid params passed', () => {
  afterEach(async () => {
    await rmfr(path.join(tmpdir(), 'cool-lib-cli'));
    await rmfr(path.join(tmpdir(), '   cool-lib-mod'));
  });

  it('creates a cli lib with no license', async () => {
    expect.assertions(3);
    const projectPath = path.join(tmpdir(), 'cool-lib-cli');
    const params = {
      libType: 'CLI',
      pkgName: 'cool-lib-cli',
      pkgManager: { cmd: 'npm', exe: 'npx' },
      license: '',
    };
    await createLib(projectPath, params);
    expect(existsSync(projectPath)).toBeTruthy();
    const files = await globby([projectPath], { dot: true });
    expect(files.length).toBeGreaterThan(0);
    expect(existsSync(path.join(projectPath, 'LICENSE'))).toBeFalsy();
  }, 15000);

  it('creates a module lib with MIT license', async () => {
    expect.assertions(2);
    const projectPath = path.join(tmpdir(), 'cool-lib-mod');
    const params = {
      libType: 'module',
      pkgName: 'cool-lib-mod',
      pkgManager: { cmd: 'npm', exe: 'npx' },
      license: 'MIT',
    };
    await createLib(projectPath, params);
    expect(existsSync(projectPath)).toBeTruthy();
    expect(existsSync(path.join(projectPath, 'LICENSE'))).toBeTruthy();
  }, 15000);

  test('npm to install cli lib dev deps', async () => {
    expect.assertions(1);
    const projectPath = path.join(tmpdir(), 'cool-lib-cli');
    const params = {
      libType: 'CLI',
      pkgName: 'cool-lib-cli',
      pkgManager: { cmd: 'npm', exe: 'npx' },
    };
    await createLib(projectPath, params);

    const rawdata = readFileSync(path.join(projectPath, 'package.json'));
    const packageData = JSON.parse(rawdata);
    expect(Object.keys(packageData.devDependencies)).toEqual([
      ...devPkgs.common,
      ...devPkgs.cli,
    ]);
  }, 15000);

  test('yarn to install module lib dev deps', async () => {
    expect.assertions(1);
    const projectPath = path.join(tmpdir(), 'cool-lib-mod');
    const params = {
      libType: 'module',
      pkgName: 'cool-lib-mod',
      pkgManager: { cmd: 'yarn', exe: 'yarn' },
    };
    await createLib(projectPath, params);

    const rawdata = readFileSync(path.join(projectPath, 'package.json'));
    const packageData = JSON.parse(rawdata);
    expect(Object.keys(packageData.devDependencies)).toEqual([
      ...devPkgs.common,
      ...devPkgs.module,
    ]);
  }, 15000);
});
