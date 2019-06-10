import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/triangle-item.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'triangleItem',
		file: 'dist/triangle-item.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: false,
			customElement: true,
			tag: 'triangle-item'
		}),

		resolve({
			browser: true
		}),
		commonjs()
	]
};