import typescript from '@rollup/plugin-typescript';
import { clean } from '@open-tech-world/rollup-plugin-clean';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/createESLib.js',
    format: 'esm',
    exports: 'auto',
  },
  plugins: [
    clean('lib/*'),
    typescript(),
    copy({
      targets: [{ src: 'src/templates', dest: 'lib' }],
      copyOnce: true,
    }),
  ],
  external: [
    '@open-tech-world/es-cli-styles',
    '@open-tech-world/node-cli-progress',
    'inquirer',
    'path',
    'ejs',
    'prettier',
    'commander',
    'url',
    'child_process',
    'util',
    'fs',
    '@open-tech-world/node-glob',
    '@open-tech-world/es-utils',
  ],
};
