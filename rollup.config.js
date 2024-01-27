// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/recorder/inject.ts',
    output: {
        // dir: 'output',
        format: 'esm',
        file: "output/inject.mjs"
    },
    plugins: [
        typescript(),
        nodeResolve()
    ]
};
