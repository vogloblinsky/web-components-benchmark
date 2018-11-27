import nodeResolve from 'rollup-plugin-node-resolve';
import jsx from 'rollup-plugin-jsx';

export default {
    input: 'dist/bundle_tmp.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: false
    },
    plugins: [
        jsx({factory: 'Omi.h'}),
        nodeResolve({
            jsnext: true,
            main: true
        })
    ]
};
