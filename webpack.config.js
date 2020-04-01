const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

const projectRoot = path.resolve(__dirname, 'dist');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: devMode ? 'development' : 'production',

  // Path to your entry point. 
  entry: './src/js/app.js',

  // where we want our JS file goes
  output: {
    path: projectRoot,
    filename: "js/[name].bundle.js",
  },

  watch: true,

  watchOptions: {
    ignored: /node_modules/
  },

  // Defines modules
  module: {
    // Defines rules for module
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //excluded node_modules 
        // loader: "babel-loader",
        // options: {
        //   presets: ["babel-preset-env"]
        // }
        use: {
          loader: "babel-loader", 
          options: {
            presets: ["@babel/preset-env"]  //Preset used for env setup
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.pug$/,

        loader: [
          "pug-loader",
          // "file-loader?name=./[name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: './assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: true,
              outputPath: './assets/images'
            }
          }
        ]
      },
      {
        test: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: true,
              outputPath: './assets/favicons'
            }
          }
        ],
      }
    ]
  },

  // 3rd party plugins
  plugins: [
    new CleanWebpackPlugin(),

    // Each HtmlWebpackPlugin() entry compiles into one page
    new HtmlWebpackPlugin({
      filename: 'landing.html', // HTML file name
      template: './src/html/pages/landing.pug', // file template to be compiled
      // inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // HTML file name
      template: './src/html/pages/index.pug', // file template to be compiled
      // inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'dna.html', // HTML file name
      template: './src/html/pages/dna.pug', // file template to be compiled
      // inject: false
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],

  devServer: {
    publicPath: "/js"
  }
};
