import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'dist/bundle_tmp.js',
    output: {
        file: 'dist/bundle.js',
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
