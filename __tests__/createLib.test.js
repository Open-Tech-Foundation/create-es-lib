const path = require('path');
const { existsSync, readFileSync } = require('fs');
const globby = require('globby');
const { tmpdir } = require('os');
const rmfr = require('rmfr');

const createLib = require('../lib/createLib/compileToCopyFiles');
const devPkgs = require('../lib/installDevDeps/devPkgs');

const cliProjectPath = path.join(tmpdir(), 'cool-lib-cli');
const modProjectPath = path.join(tmpdir(), 'cool-lib-mod');

async function cleanUp() {
  await rmfr(cliProjectPath);
  await rmfr(modProjectPath);
}

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
  beforeEach(() => {
    return cleanUp();
  });

  afterEach(() => {
    return cleanUp();
  });

  it('creates a cli lib with no license', async () => {
    expect.assertions(3);
    const params = {
      libType: 'CLI',
      pkgName: 'cool-lib-cli',
      pkgManager: { cmd: 'npm', exe: 'npx' },
      license: '',
    };
    await createLib(cliProjectPath, params);
    expect(existsSync(cliProjectPath)).toBeTruthy();
    const files = await globby([cliProjectPath], { dot: true });
    expect(files.length).toBeGreaterThan(0);
    expect(existsSync(path.join(cliProjectPath, 'LICENSE'))).toBeFalsy();
  }, 15000);

  it('creates a module lib with MIT license', async () => {
    expect.assertions(2);
    const params = {
      libType: 'module',
      pkgName: 'cool-lib-mod',
      pkgManager: { cmd: 'npm', exe: 'npx' },
      license: 'MIT',
    };
    await createLib(modProjectPath, params);
    expect(existsSync(modProjectPath)).toBeTruthy();
    expect(existsSync(path.join(modProjectPath, 'LICENSE'))).toBeTruthy();
  }, 15000);

  test('npm to install cli lib dev deps', async () => {
    expect.assertions(1);
    const params = {
      libType: 'CLI',
      pkgName: 'cool-lib-cli',
      pkgManager: { cmd: 'npm', exe: 'npx' },
    };
    await createLib(cliProjectPath, params);

    const rawdata = readFileSync(path.join(cliProjectPath, 'package.json'));
    const packageData = JSON.parse(rawdata);
    expect(Object.keys(packageData.devDependencies)).toEqual([
      ...devPkgs.common,
      ...devPkgs.cli,
    ]);
  }, 15000);

  test('yarn to install module lib dev deps', async () => {
    expect.assertions(1);
    const params = {
      libType: 'module',
      pkgName: 'cool-lib-mod',
      pkgManager: { cmd: 'yarn', exe: 'yarn' },
    };
    await createLib(modProjectPath, params);

    const rawdata = readFileSync(path.join(modProjectPath, 'package.json'));
    const packageData = JSON.parse(rawdata);
    expect(Object.keys(packageData.devDependencies)).toEqual([
      ...devPkgs.common,
      ...devPkgs.module,
    ]);
  }, 15000);
});
