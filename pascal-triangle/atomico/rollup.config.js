import pkg from "./package.json";
import size from "rollup-plugin-bundle-size";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import sucrase from "rollup-plugin-sucrase";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import browsersync from "rollup-plugin-browsersync";

let globals = {
	"@atomico/core": "@atomico/core",
	"@atomico/element": "@atomico/element"
};

let plugins = [
	del({
		targets: [pkg.module.replace(/\/[^\/]+$/, "")]
	}),
	resolve({
		extensions: [".js", ".ts"]
	}),
	postcss({
		minimize: true
	}),
	sucrase({
		production: true,
		exclude: ["node_modules/**"],
		jsxPragma: "h",
		transforms: ["typescript", "jsx"]
	})
	/**
	 * Optional configuration recommended for buble
	 * coverage es6 >=95% in 2019(https://caniuse.com/)
	 * install before: `yarn add -D rollup-plugin-buble`
	 */
	// buble({
	// 		target: {
	// 			chrome: 58,
	// 			edge: 15,
	// 			safari: 10
	// 		},
	// 		jsx: "h",
	// 		objectAssign: "Object.assign"
	// 	})
];

if (process.env.ROLLUP_WATCH) {
	plugins.push(browsersync({ server: "public" }));
} else {
	process.env.BUILD = "production";
	plugins.push(terser());
}

plugins.push(size());

export default {
	input: pkg.source,
	output: [
		{
			name: pkg.name,
			file: pkg.unpkg,
			format: "umd",
			sourcemap: true,
			globals
		},
		{
			file: pkg.module,
			format: "esm",
			sourcemap: true,
			globals
		}
	],
	plugins
};
