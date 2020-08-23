'use strict';

const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

const outputPath = path.join(__dirname, 'public');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: outputPath,
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};
