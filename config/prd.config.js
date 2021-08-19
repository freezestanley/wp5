const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin")

const { merge } = require('webpack-merge')
const base = require('./base.config')


let prd = merge(base, {
  devtool: 'nosources-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
        extractComments: "all",
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          name: 'commons',
        },
      },
      //最小的文件大小 超过之后将不予打包
      minSize: {
        javascript: 100000,
        style: 100000,
      },
      //最大的文件 超过之后继续拆分
      maxSize: {
        javascript: 300000, //故意写小的效果更明显
        style: 300000,
      },
    },
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  output: {
    path: path.join(__dirname, '../dist'),
    // publicPath: 'https://cdn.example.com/assets/[fullhash]/',  // open cdn
    filename: '[name].[contenthash:8].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  plugins: [
    new CompressionPlugin(),
    new Webpack.DefinePlugin({
      TYPE: JSON.stringify({
        name: 'this is prd'
      })
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality:  75
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    }),
  ]
})
module.exports = prd