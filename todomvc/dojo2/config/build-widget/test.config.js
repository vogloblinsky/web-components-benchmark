"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_config_1 = require("./base.config");
const path = require("path");
const globby = require("globby");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const basePath = process.cwd();
function webpackConfig(args) {
    const config = base_config_1.default(args);
    const { plugins, output, module } = config;
    const instrumenterOptions = args.legacy ? {} : { esModules: true };
    config.entry = () => {
        const unit = globby
            .sync([`${basePath}/tests/unit/**/*.ts`])
            .map((filename) => filename.replace(/\.ts$/, ''));
        const functional = globby
            .sync([`${basePath}/tests/functional/**/*.ts`])
            .map((filename) => filename.replace(/\.ts$/, ''));
        const tests = {};
        if (unit.length) {
            tests.unit = unit;
        }
        if (functional.length) {
            tests.functional = functional;
        }
        return tests;
    };
    const externals = config.externals || [];
    config.plugins = [
        ...plugins.map(plugin => {
            if (plugin instanceof ExtractTextPlugin) {
                plugin.options = Object.assign({}, plugin.options, { disable: true });
            }
            return plugin;
        }),
        new CleanWebpackPlugin(['test'], { root: output.path, verbose: false })
    ];
    module.rules = module.rules.map(rule => {
        if (Array.isArray(rule.use)) {
            rule.use = rule.use.map(loader => {
                if (typeof loader === 'string') {
                    return loader;
                }
                if (loader.loader === 'umd-compat-loader') {
                    return {
                        loader: loader.loader,
                        options: {}
                    };
                }
                return loader;
            });
        }
        return rule;
    });
    module.rules.push({
        test: /src[\\\/].*\.ts(x)?$/,
        use: {
            loader: 'istanbul-instrumenter-loader',
            options: instrumenterOptions
        },
        enforce: 'post'
    });
    externals.push(/^intern/);
    config.externals = externals;
    config.devtool = 'inline-source-map';
    config.output = Object.assign({}, output, { chunkFilename: `[name].js`, filename: `[name].js`, path: path.join(output.path, 'test') });
    return config;
}
exports.default = webpackConfig;
//# sourceMappingURL=test.config.js.map