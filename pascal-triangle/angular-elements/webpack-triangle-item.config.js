const path = require('path');
const NgCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/triangle-item/index.ts',
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new NgCompilerPlugin({
      tsConfigPath: 'tsconfig.json',
      mainPath: 'src/triangle-item/index.ts'
    }),
    new UglifyJsPlugin(),
    new CompressionPlugin()
  ],
  output: {
    path: __dirname + '/dist/triangle-item',
    filename: 'index.js'
  },
  mode: 'production',
  stats: {
    assets: true,
    warnings: false
  }
};
