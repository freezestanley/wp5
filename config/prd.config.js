const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')

const { merge } = require('webpack-merge')
const base = require('./base.config')

let prd = merge(base, {
  devtool: 'nosources-source-map',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
        extractComments: false
      })
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          maxInitialRequests: 5,
          reuseExistingChunk: true
        }
      },
      //最小的文件大小 超过之后将不予打包
      minSize: {
        javascript: 100000,
        style: 100000
      },
      //最大的文件 超过之后继续拆分
      maxSize: {
        javascript: 300000, //故意写小的效果更明显
        style: 300000
      }
    }
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true
  },
  output: {
    path: path.join(__dirname, '../dist'),
    // publicPath: 'https://cdn.example.com/assets/[fullhash]/',  // open cdn
    filename: '[name].[contenthash:8].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      compressionOptions: { level: 1 },
      threshold: 1024 * 0,
      minRatio: 0.7
    }),
    new Webpack.DefinePlugin({
      TYPE: JSON.stringify({
        name: 'this is prd'
      })
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 75
          }
        }
      ],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    })
    // new SentryCliPlugin({
    //   include: './dist',
    //   ignoreFile: '.sentrycliignore',
    //   ignore: ['node_modules', 'config'],
    //   configFile: './sentryclirc',
    //   deleteAfterCompile: true
    // })
  ]
})
module.exports = prd
