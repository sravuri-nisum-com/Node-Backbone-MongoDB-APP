var webpack = require("webpack");
// var path = require("path");
// var fs = require("fs");

var nodeModules = {};


 
module.exports = {
  entry: {
    app: "./src/js/scripts.js"
    // specs: "./src/specs.js"
  },
  output: {
    filename: "./build/[name].build.js"
  },
//   externals: nodeModules,

  resolve: {
    extensions: ["", ".js"]
  },
  module: {
    loaders: [

       { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      Backbone: "backbone",
      _: "underscore"
    })
  ]
};

