import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'build/es6-unbundled/bundle_tmp.js',
    output: {
        file: 'build/es6-unbundled/bundle.js',
        format: 'es',
        sourcemap: false
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        })
    ]
};
