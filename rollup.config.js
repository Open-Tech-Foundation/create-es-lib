import typescript from '@rollup/plugin-typescript';
import clean from '@open-tech-world/rollup-plugin-clean';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/createESLib.cjs.js',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [clean({ start: 'lib/**' }), typescript()],
  external: [
    'chalk',
    'yargs',
    'inquirer',
    'globby',
    'path',
    'fs/promises',
    'ejs',
    'ora',
  ],
};
