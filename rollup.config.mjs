// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { string } from 'rollup-plugin-string';

const configs = {
    main: {
        input: 'src/recorder/inject.ts',
        output: {
            format: 'esm',
            file: "output/wgi.mjs"
        },
        plugins: [
            nodeResolve(),
            typescript()
        ]
    },
    viewer: {
        input: 'src/viewer/index.ts',
        output: {
            format: 'esm',
            file: "output/viewer.mjs"
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            string({
                include: "**/*.wgsl"
            }),
            typescript(),
            postcss(),
            replace({
                preventAssignment: false,
                'process.env.NODE_ENV': '"development"'
            })
        ],
        onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
            }
            warn(warning)
        }
    }
};

export default configs[process.env.entry ?? "main"];
