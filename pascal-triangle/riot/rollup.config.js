import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'dist/app.js',
    output: {
        file: 'dist/bundle_tmp.js',
        format: 'es',
        sourcemap: false
    },
    plugins: [nodeResolve({ jsnext: true })],
    external: ['moment']
};
