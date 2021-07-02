import typescript from '@rollup/plugin-typescript';
import clean from '@open-tech-world/rollup-plugin-clean';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/createESLib.cjs.js',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    clean({ start: 'lib/**' }),
    typescript(),
    copy({
      targets: [{ src: 'src/templates', dest: 'lib' }],
      copyOnce: true,
    }),
  ],
  external: [
    'chalk',
    'yargs',
    'inquirer',
    'globby',
    'path',
    'fs/promises',
    'ejs',
    'ora',
    'camelcase',
  ],
};
