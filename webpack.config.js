'use strict';

const path = require('path');
const PATH_PUBLIC = 'public';

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, PATH_PUBLIC)
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, PATH_PUBLIC),
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};
