import { sizeSnapshot } from "rollup-plugin-size-snapshot";

import pkg from './package.json';

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    {
        input: 'src/index.js',
        output: [
            { file: `dist/${pkg.main}`, format: 'cjs' },
            { file: `dist/${pkg.module}`, format: 'es' }
        ],
        plugins: [sizeSnapshot()]
    }
];