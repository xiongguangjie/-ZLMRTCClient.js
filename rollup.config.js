// Rollup plugins
import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import replace from '@rollup/plugin-replace';
import { nodeResolve }  from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const pkg = require('./package.json');

export default {
    input: 'src/export.js',
    output: [
        {
            file: 'demo/ZLMRTCClient.js',
            format: 'iife',
            name: 'ZLMRTCClient',
            sourcemap: true // 'inline'
        }
    ],
    plugins: [
        replace({
            exclude: 'node_modules/**',
            include:['src/ulity/version.js'],
            preventAssignment:true,
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            values:{
                __BUILD_DATE__: () => (new Date()).toString(),
                __VERSION__:pkg.version
            }
        }),
        eslint(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled' 
            
        }),
        (process.env.NODE_ENV === 'production'),
    ],
};