import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'dist/bundle_tmp.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: false
    },
    plugins: [
        resolve()
    ]
};
