"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_config_1 = require("./base.config");
const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const fs_1 = require("fs");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer-sunburst').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = fs_1.existsSync(packageJsonPath) ? require(packageJsonPath) : {};
function webpackConfig(args) {
    const config = base_config_1.default(args);
    const { plugins, output } = config;
    const location = path.join('dist', args.element.name);
    config.plugins = [
        ...plugins,
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportType: 'sunburst',
            generateStatsFile: true,
            reportFilename: path.join('..', '..', 'info', args.element.name, 'report.html'),
            statsFilename: path.join('..', '..', 'info', args.element.name, 'stats.json')
        }),
        new UglifyJsPlugin({ sourceMap: true, cache: true }),
        new WebpackChunkHash(),
        new CleanWebpackPlugin([location], { root: output.path, verbose: false }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ];
    config.plugins = config.plugins.map(plugin => {
        if (plugin instanceof ExtractTextPlugin) {
            return new ExtractTextPlugin({
                filename: `[name]-${packageJson.version}.css`,
                allChunks: true
            });
        }
        return plugin;
    });
    config.output = Object.assign({}, output, { path: path.join(output.path, location) });
    return config;
}
exports.default = webpackConfig;
//# sourceMappingURL=dist.config.js.map