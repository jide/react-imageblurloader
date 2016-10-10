/*globals __dirname:false */
"use strict";

var webpack = require("webpack");

module.exports = {
  devServer: {
    contentBase: __dirname,
    noInfo: false
  },
  output: {
    path: __dirname,
    filename: "main.js"
  },
  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/app.js"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ["", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loaders: ["babel-loader"]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
