"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_config_1 = require("./base.config");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
function webpackConfig(args) {
    const config = base_config_1.default(args);
    const { plugins, output } = config;
    const location = path.join('dev', args.element.name);
    config.plugins = [...plugins, new CleanWebpackPlugin([location], { root: output.path, verbose: false })];
    config.output = Object.assign({}, output, { path: path.join(output.path, location) });
    config.devtool = 'inline-source-map';
    return config;
}
exports.default = webpackConfig;
//# sourceMappingURL=dev.config.js.map