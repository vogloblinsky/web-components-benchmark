'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
const webpack = require('webpack');
const path = require('path');
const fs_1 = require('fs');
const CssModulePlugin_1 = require('@dojo/webpack-contrib/css-module-plugin/CssModulePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaderUtils = require('loader-utils');
const postcssPresetEnv = require('postcss-preset-env');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const slash = require('slash');
const basePath = process.cwd();
const srcPath = path.join(basePath, 'src');
const testPath = path.join(basePath, 'tests');
const allPaths = [srcPath, testPath];
const packageJsonPath = path.join(basePath, 'package.json');
const packageJson = fs_1.existsSync(packageJsonPath) ?
    require(packageJsonPath) :
    {};
const packageName = packageJson.name || '';
const tsLintPath = path.join(basePath, 'tslint.json');
const tsLint = fs_1.existsSync(tsLintPath) ? require(tsLintPath) : false;

function getJsonpFunctionName(name) {
    name = name
        .replace(/[^a-z0-9_]/g, ' ')
        .trim()
        .replace(/\s+/g, '_');
    return `dojoWebpackJsonp${name}`;
}

function getUMDCompatLoader(options) {
    const {
        bundles = {}
    } = options;
    return {
        loader: 'umd-compat-loader',
        options: {
            imports(module, context) {
                const filePath = path.relative(
                    basePath,
                    path.join(context, module)
                );
                let chunkName = slash(filePath);
                Object.keys(bundles).some(name => {
                    if (bundles[name].indexOf(slash(filePath)) > -1) {
                        chunkName = name;
                        return true;
                    }
                    return false;
                });
                return `@dojo/webpack-contrib/promise-loader?global,${chunkName}!${module}`;
            }
        }
    };
}

function getLocalIdent(loaderContext, localIdentName, localName, options) {
    if (!options.context) {
        if (
            loaderContext.options &&
            typeof loaderContext.options.context === 'string'
        ) {
            options.context = loaderContext.options.context;
        } else {
            options.context = loaderContext.context;
        }
    }
    const request = slash(
        path.relative(options.context, loaderContext.resourcePath)
    );
    options.content = `${options.hashPrefix}${request}+${localName}`;
    localIdentName = localIdentName.replace(/\[local\]/gi, localName);
    const hash = loaderUtils.interpolateName(
        loaderContext,
        localIdentName,
        options
    );
    return hash
        .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
        .replace(/^((-?[0-9])|--)/, '_$1');
}
const removeEmpty = items => items.filter(item => item);
const banner = `
[Dojo](https://dojo.io/)
Copyright [JS Foundation](https://js.foundation/) & contributors
[New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
All rights reserved
`;

function colorToColorMod(style) {
    style.walkDecls(decl => {
        decl.value = decl.value.replace('color(', 'color-mod(');
    });
}

function webpackConfigFactory(args) {
    const elements = args.element ? [args.element] : args.elements;
    const jsonpIdent = args.element ? args.element.name : 'custom-elements';
    const extensions = args.legacy ?
        ['.ts', '.tsx', '.js'] :
        ['.ts', '.tsx', '.mjs', '.js'];
    const compilerOptions = args.legacy ?
        {} :
        {
            target: 'es6',
            module: 'esnext'
        };
    const features = args.legacy ? args.features : ['chrome'];
    const postcssPresetConfig = {
        browsers: args.legacy ?
            ['last 2 versions', 'ie >= 10'] :
            ['last 2 versions'],
        insertBefore: {
            'color-mod-function': colorToColorMod
        },
        features: {
            'color-mod-function': true,
            'nesting-rules': true
        },
        autoprefixer: {
            grid: args.legacy
        }
    };
    const config = {
        entry: elements.reduce((entry, element) => {
            entry[element.name] = [
                `imports-loader?widgetFactory=${element.path}!${path.join(
                    __dirname,
                    'template',
                    'custom-element.js'
                )}`
            ];
            return entry;
        }, {}),
        node: {
            dgram: 'empty',
            net: 'empty',
            tls: 'empty',
            fs: 'empty'
        },
        output: {
            chunkFilename: `[name]-${packageJson.version}.js`,
            filename: `[name]-${packageJson.version}.js`,
            jsonpFunction: getJsonpFunctionName(
                `-${packageName}-${jsonpIdent}`
            ),
            libraryTarget: 'jsonp',
            path: path.resolve('./dist')
        },
        resolve: {
            modules: [basePath, path.join(basePath, 'node_modules')],
            extensions
        },
        devtool: false,
        watchOptions: {
            ignored: /node_modules/
        },
        plugins: removeEmpty([
            new CssModulePlugin_1.default(basePath),
            new webpack.BannerPlugin(banner),
            new IgnorePlugin(/request\/providers\/node/),
            new ExtractTextPlugin({
                filename: getPath =>
                    getPath(`[name]-${packageJson.version}.css`)
            }),
            new webpack.NamedChunksPlugin(),
            new webpack.NamedModulesPlugin()
        ]),
        module: {
            rules: removeEmpty([
                tsLint && {
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    options: {
                        configuration: tsLint,
                        emitErrors: true,
                        failOnHint: true
                    }
                },
                {
                    test: /@dojo\/.*\.js$/,
                    enforce: 'pre',
                    loader: 'source-map-loader-cli',
                    options: {
                        includeModulePaths: true
                    }
                },
                {
                    include: allPaths,
                    test: /.*\.ts?$/,
                    enforce: 'pre',
                    loader: `@dojo/webpack-contrib/css-module-dts-loader?type=ts&instanceName=0_${jsonpIdent}`
                },
                {
                    include: allPaths,
                    test: /.*\.m\.css?$/,
                    enforce: 'pre',
                    loader: '@dojo/webpack-contrib/css-module-dts-loader?type=css'
                },
                {
                    include: allPaths,
                    test: /.*\.ts(x)?$/,
                    use: removeEmpty([
                        features && {
                            loader: '@dojo/webpack-contrib/static-build-loader',
                            options: {
                                features
                            }
                        },
                        getUMDCompatLoader({
                            bundles: args.bundles
                        }),
                        {
                            loader: 'ts-loader',
                            options: {
                                onlyCompileBundledFiles: true,
                                instance: jsonpIdent,
                                transpileOnly: true,
                                compilerOptions
                            }
                        }
                    ])
                },
                {
                    test: /\.mjs$/,
                    use: removeEmpty([{
                        loader: '@dojo/webpack-contrib/static-build-loader',
                        options: {
                            features
                        }
                    }])
                },
                {
                    test: /\.js?$/,
                    use: removeEmpty([
                        features && {
                            loader: '@dojo/webpack-contrib/static-build-loader',
                            options: {
                                features
                            }
                        },
                        'umd-compat-loader'
                    ])
                },
                {
                    test: new RegExp(`globalize(\\${path.sep}|$)`),
                    loader: 'imports-loader?define=>false'
                },
                {
                    test: /.*\.(gif|png|jpe?g|svg|eot|ttf|woff|woff2)$/i,
                    loader: 'file-loader?hash=sha512&digest=hex&name=[hash:base64:8].[ext]'
                },
                {
                    test: /\.css$/,
                    exclude: allPaths,
                    use: ExtractTextPlugin.extract({
                        fallback: ['style-loader'],
                        use: ['css-loader?sourceMap']
                    })
                },
                {
                    test: /\.m\.css.js$/,
                    exclude: allPaths,
                    use: ['json-css-module-loader']
                },
                {
                    include: allPaths,
                    test: /.*\.css?$/,
                    use: ExtractTextPlugin.extract({
                        fallback: ['style-loader'],
                        use: [
                            '@dojo/webpack-contrib/css-module-decorator-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    sourceMap: true,
                                    importLoaders: 1,
                                    localIdentName: '[name]__[local]__[hash:base64:5]',
                                    getLocalIdent
                                }
                            },
                            {
                                loader: 'postcss-loader?sourceMap',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        require('postcss-import')(),
                                        postcssPresetEnv(postcssPresetConfig)
                                    ]
                                }
                            }
                        ]
                    })
                }
            ])
        }
    };
    return config;
}
exports.default = webpackConfigFactory;
//# sourceMappingURL=base.config.js.map