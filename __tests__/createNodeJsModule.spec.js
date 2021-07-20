import process from 'process';
import Os from 'os';
import { jest } from '@jest/globals';
import fg from 'fast-glob';

import { createNodeJsModule } from '../lib/createESLib.js';
import { existsSync, rmdirSync } from 'fs';
import path from 'path';

const tempDir = Os.tmpdir();
const myLibPath = path.join(tempDir, 'my-lib');
let ConsoleError;
const baseConfig = {
  libName: 'my-lib',
  libType: 'node_mod',
  ts: false,
  authorFullName: 'tg',
  authorEmail: 'a@a',
  gitProvider: null,
  lic: null,
  bundler: null,
  buildDir: 'lib',
  testRunner: null,
  year: 2021,
};

beforeAll(() => {
  try {
    rmdirSync(myLibPath, { recursive: true });
  } catch (error) {
    return;
  }
});

beforeEach(() => {
  const cwdSpy = jest.spyOn(process, 'cwd');
  cwdSpy.mockReturnValue(tempDir);
  ConsoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  rmdirSync(myLibPath, { recursive: true });
});

describe('createNodeJsModule', () => {
  it(
    'creates a js lib with npm',
    async () => {
      const config = {
        ...baseConfig,
        pkgManager: 'npm',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(['my-lib/**', '!my-lib/node_modules'], {
        dot: true,
        cwd: tempDir,
      });
      expect(files.length).toBe(8);
      expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'node_modules'))).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, 'package-lock.json'))
      ).toBeTruthy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a js lib with yarn v2 node_modules',
    async () => {
      const config = {
        ...baseConfig,
        pkgManager: 'yarn-v2-nm',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(
        ['my-lib/**', '!my-lib/.yarn', '!my-lib/node_modules'],
        {
          dot: true,
          cwd: tempDir,
        }
      );
      expect(files.length).toBe(9);
      expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'node_modules'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'package-lock.json'))).toBeFalsy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a js lib with yarn v2 pnp',
    async () => {
      const config = {
        ...baseConfig,
        pkgManager: 'yarn-v2-pnp',
      };

      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(['my-lib/**', '!my-lib/.yarn'], {
        dot: true,
        cwd: tempDir,
      });
      expect(files.length).toBe(10);
      expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'node_modules'))).toBeFalsy();
      expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'package-lock.json'))).toBeFalsy();
      expect(existsSync(path.join(myLibPath, '.pnp.cjs'))).toBeTruthy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a js lib with Apache-2.0 license',
    async () => {
      const config = {
        ...baseConfig,
        lic: 'Apache-2.0',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(['my-lib/**'], {
        dot: true,
        cwd: tempDir,
      });
      expect(files.length).toBe(8);
      expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'LICENSE'))).toBeTruthy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a js lib with MIT license',
    async () => {
      const config = {
        ...baseConfig,
        lic: 'MIT',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(['my-lib/**'], {
        dot: true,
        cwd: tempDir,
      });
      expect(files.length).toBe(8);
      expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'LICENSE'))).toBeTruthy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a ts lib with rollup bundler',
    async () => {
      const config = {
        ...baseConfig,
        ts: true,
        pkgManager: 'yarn-v2-nm',
        bundler: 'rollup',
        buildDir: 'lib',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(
        ['my-lib/**', '!my-lib/node_modules', '!my-lib/.yarn'],
        {
          dot: true,
          cwd: tempDir,
        }
      );
      expect(files.length).toBe(11);
      expect(existsSync(path.join(myLibPath, 'src', 'index.ts'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'rollup.config.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, '.yarnrc.yml'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'tsconfig.json'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a ts lib with rollup & jest',
    async () => {
      const config = {
        ...baseConfig,
        pkgScope: 'tech',
        ts: true,
        pkgManager: 'yarn-v2-nm',
        bundler: 'rollup',
        buildDir: 'lib',
        testRunner: 'jest',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(
        ['my-lib/**', '!my-lib/node_modules', '!my-lib/.yarn'],
        {
          dot: true,
          cwd: tempDir,
        }
      );
      expect(files.length).toBe(13);
      expect(existsSync(path.join(myLibPath, 'src', 'index.ts'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'rollup.config.js'))).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, '__tests__/myLib.spec.js'))
      ).toBeTruthy();
      expect(existsSync(path.join(myLibPath, '.yarnrc.yml'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'rollup.config.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'jest.config.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'tsconfig.json'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
    },
    1000 * 60 * 10
  );

  it(
    'creates a js lib & add files to git with commit msg',
    async () => {
      const config = {
        ...baseConfig,
        pkgScope: 'tech',
        gitProvider: 'github',
        gitProviderUsername: 'ganapathy888',
        commitMsg: 'Initial commit',
      };
      await createNodeJsModule(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = fg.sync(['my-lib/**', '!my-lib/.git'], {
        dot: true,
        cwd: tempDir,
      });
      expect(files.length).toBe(7);
      expect(existsSync(path.join(myLibPath, '.git'))).toBeTruthy();
    },
    1000 * 60 * 10
  );
});
