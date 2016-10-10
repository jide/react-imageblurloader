'use strict';

var webpack = require('webpack');
var path = require('path');

let babelPlugins = '',
    externals = {
      'react': 'react',
      'moveit': 'moveit'
    },
    plugins = [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ];

if (process.env.NODE_ENV === 'test') {
  externals = {};
  plugins = [];
}

module.exports = {
  cache: true,
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, "lib"),
    filename: "bundle.js",
    libraryTarget: "umd"
  },
  externals: externals,
  resolve: {
    extensions: ['', '.js', 'jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'babel' + babelPlugins
      }
    ]
  },
  plugins: plugins
};
