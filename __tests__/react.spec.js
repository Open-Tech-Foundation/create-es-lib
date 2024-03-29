import process from 'process';
import Os from 'os';
import { jest } from '@jest/globals';
import { globSync } from '@open-tech-world/node-glob';

import { createReactLib } from '../lib/createESLib.js';
import { existsSync, rmdirSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const tempDir = Os.tmpdir();
const myLibPath = path.join(tempDir, 'my-react-lib');
let ConsoleError;
const baseConfig = {
  libName: 'my-react-lib',
  libType: 'react',
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

const globOptions = {
  dot: true,
  cwd: myLibPath,
  dirs: false,
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

describe('Create React Lib', () => {
  it(
    'creates a js lib',
    async () => {
      const config = {
        ...baseConfig,
        pkgManager: 'npm',
        bundler: 'rollup',
        testRunner: 'jest',
      };
      await createReactLib(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = globSync(['**', '!node_modules/**'], globOptions);
      expect(files.length).toBe(13);
      expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, 'src', 'MyReactLib.js'))
      ).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, 'babel.config.json'))
      ).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'package.json'))).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, 'package-lock.json'))
      ).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'rollup.config.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'jest.config.js'))).toBeTruthy();
      expect(() => execSync('npm run build', { cwd: myLibPath })).not.toThrow();
      expect(() => execSync('npm run test', { cwd: myLibPath })).not.toThrow();
    },
    1000 * 60 * 10
  );

  it(
    'creates a ts lib with yarn v2 node-modules',
    async () => {
      const config = {
        ...baseConfig,
        pkgScope: 'otw',
        ts: true,
        pkgManager: 'yarn-v2-nm',
        bundler: 'rollup',
        testRunner: 'jest',
      };
      await createReactLib(config);
      expect(ConsoleError).not.toHaveBeenCalled();
      expect(existsSync(myLibPath)).toBeTruthy();
      const files = globSync(
        ['**', '!node_modules/**', '!.yarn/**'],
        globOptions
      );
      expect(files.length).toBe(15);
      expect(existsSync(path.join(myLibPath, 'src', 'index.ts'))).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, 'src', 'MyReactLib.tsx'))
      ).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, 'babel.config.json'))
      ).toBeTruthy();
      expect(
        existsSync(path.join(myLibPath, '__tests__', 'MyReactLib.spec.js'))
      ).toBeTruthy();
      expect(existsSync(path.join(myLibPath, '.yarnrc.yml'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'rollup.config.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'jest.config.js'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'tsconfig.json'))).toBeTruthy();
      expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
      expect(() => execSync('yarn build', { cwd: myLibPath })).not.toThrow();
      expect(() => execSync('yarn test', { cwd: myLibPath })).not.toThrow();
    },
    1000 * 60 * 10
  );
});
