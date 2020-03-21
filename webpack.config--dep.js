// Webpack uses this to work with directories
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const projectRoot = path.resolve(__dirname, 'dist');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/js/app.js',

  output: {
    filename: '[name].bundle.js',
    path: projectRoot
  },

  watch: true,

  watchOptions: {
    ignored: /node_modules/
  },

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      },

      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attr: [":src"]
          }
        }
      },

      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.css$/,
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // sass-loader
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          "file-loader?name=[path][name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader"
        ]
      },

      {
        "test": /.(dist\/assets\/images|dist\/assets\/videos)$/,
        "use": "file-loader"
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader"
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader"
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      // {
      //   test: /\.(mp4)$/i,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       outputPath: 'assets/videos'
      //     }
      //   }
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         esModule: false,
      //         outputPath: 'assets/images'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'assets/images/svg'
            }
          }
        ]
      },
      // {
      //   test: /\.(woff|woff2|ttf|otf|eot)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         outputPath: 'assets/fonts'
      //       }
      //     }
      //   ]
      // }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin(), // Generates default index.html
    // new HtmlWebpackPlugin({  // Also generate a test.html
    //   filename: 'html/c-thumbnail.html',
    //   template: 'src/html/c-thumbnail.html'
    // }),,
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  ],

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         priority: -10,
  //         test: /[\\/]node_modules[\\/]/
  //       }
  //     },

  //     chunks: 'async',
  //     minChunks: 1,
  //     minSize: 30000,
  //     name: true
  //   }
  // },

  devServer: {
    open: true
  }
};
