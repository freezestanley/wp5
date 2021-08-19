const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const threadLoader = require('thread-loader');
const CopyPlugin = require("copy-webpack-plugin");

const isEnvProduction =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development";

module.exports = {
  stats: {
    children: true
  },
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus(),
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isEnvProduction ? miniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              sourceMap: false,
              modules: {
                localIdentName: "[path][local]-[hash:base64:5]"
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isEnvProduction ? miniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              sourceMap: false,
              modules: {
                localIdentName: "[path][local]-[hash:base64:5]"
              }
            }
          },
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              sassOptions: {
                indentWidth: 4,
                outputStyle: "compressed",
              },
            },
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              url: true,
              import: true,
              modules: {
                localIdentName: "[path][local]-[hash:base64:5]"
              }
            }
          },
          'postcss-loader',
          {
            loader: "less-loader",
            options: {
              sourceMap: false,
              lessOptions: { javascriptEnabled: true }
            },
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 4kb
          },
        },
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello React!",
      template: './public/index.html',
      minify: {
        collapseWhitespace:true,
        removeComments:true
      }
    }),
    new miniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new Webpack.ProvidePlugin({ // shimming
      _: 'lodash',
    }),
    // 拷贝public中的文件到最终打包文件夹里
    new CopyPlugin({
      patterns: [
        {
          from: "./public/**/*",
          to: "./",
          globOptions: {
            ignore: ["**/favicon.png", "**/index.html", "**/*.less", "**/*.sass"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ]
}

