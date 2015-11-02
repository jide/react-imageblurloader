"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = {
  cache: true,
  entry: path.join(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "lib"),
    filename: "bundle.js",
    libraryTarget: "commonjs2"
  },
  externals: {
    'react': 'react',
    'moveit': 'moveit',
    'react-dom': 'react-dom'
  },
  resolve: {
    extensions: ["", ".js", "jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel-loader?optional[]=runtime&stage=0"
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
