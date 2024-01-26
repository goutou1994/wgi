// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/recorder/inject.ts',
    output: {
        dir: 'output',
        format: 'esm'
    },
    plugins: [
        typescript()
    ]
};
