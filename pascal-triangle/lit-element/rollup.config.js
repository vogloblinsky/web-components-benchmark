import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'js/app.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: false
    },
    plugins: [
        resolve()
    ]
};
