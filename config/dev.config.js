const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./base.config')

module.exports = merge(base, {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    watchContentBase: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      TYPE: JSON.stringify({
        name: 'this is dev'
      })
    })
  ]
})