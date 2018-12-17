import buble from "rollup-plugin-buble";
import resolve from "rollup-plugin-node-resolve";
import {
    terser
} from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";
import colors from "colors";
import prepare from "rollup-prepare";
import postcss from "rollup-plugin-postcss";
import copy from 'rollup-plugin-copy';
import cssnano from "cssnano";

const rollupConfig = {
    ...prepare({
        pkg
    }),
    plugins: plugins(false)
};

rollupConfig.output[0].sourcemap = false;

export default rollupConfig;

/**
 * Returns the generic plugins to be used for packaging
 * @param {boolean} classes - lets you disable the transformation of classes
 * @return {Array}
 */
function plugins(classes = true) {
    return [
        commonjs({
            include: "node_modules/**"
        }),
        resolve(),
        postcss({
            plugins: [cssnano]
        }),
        buble({
            jsx: "h",
            transforms: {
                classes
            },
            objectAssign: "Object.assign"
        }),
        terser(),
        copy({
            "node_modules/atomico/dist/atomico.umd.js": "public/atomico.umd.js",
            verbose: true
        }),
        filesize()
    ];
}