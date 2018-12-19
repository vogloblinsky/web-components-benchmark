import svelte from 'rollup-plugin-svelte';
import uglify from 'rollup-plugin-uglify-es';
import filesize from 'rollup-plugin-filesize';

const plugins = [
    svelte({
        customElement: true
    })
];
if (process.env.production) {
    plugins.push(
        uglify({
            compress: true,
            mangle: true
        }),
        filesize()
    );
}

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: process.env.production ? false : true
    },
    plugins
};