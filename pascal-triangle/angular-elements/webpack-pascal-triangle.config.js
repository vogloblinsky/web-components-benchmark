const path = require('path');
const NgCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/pascal-triangle/index.ts',
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
      mainPath: 'src/pascal-triangle/index.ts'
    }),
    new UglifyJsPlugin(),
    new CompressionPlugin()
  ],
  output: {
    path: __dirname + '/dist/pascal-triangle',
    filename: 'index.js'
  },
  mode: 'production',
  stats: {
    assets: true,
    warnings: false
  }
};
