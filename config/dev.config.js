const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./base.config')

module.exports = merge(base, {
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    usedExports: true,
  },
  devServer: {
    port: 3000,
    watchContentBase: true,
    hot: true,
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  cache: {
    type: 'memory'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      TYPE: JSON.stringify({
        name: 'this is dev'
      })
    })
  ]
})