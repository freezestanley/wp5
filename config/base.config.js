const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  stats: {
    children: true
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                parser: "postcss-js",
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
              execute: true,
            },
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
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
          miniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: false,
            },
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
            limit: 10 * 1024,
            esModule: false, //必须添加的参数
            name: "[hash:10].[ext]"
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace:true,
        removeComments:true
      }
    }),
    new miniCssExtractPlugin()
  ],
}