'use strict';

const path = require('path');

const outputPath = path.join(__dirname, 'public');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: outputPath
  },
  devtool: 'source-map',
  devServer: {
    contentBase: outputPath,
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};
