const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

const projectRoot = path.resolve(__dirname, 'dist');

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
  mode: devMode ? 'development' : 'production',
  
  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/js/app.js',
  
	output: {
    path: projectRoot,
    filename: "js/[name].bundle.js",
  },
  
  watch: true,

  watchOptions: {
    ignored: /node_modules/
  },

	plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
		new MiniCssExtractPlugin({
      filename: "css/[name].css"
		})
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader", 
				options: {
					presets: ["env"]
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
              hmr: process.env.NODE_ENV === 'development'
            },
          },
					'css-loader',
          'sass-loader'
				],
			},
			{
        test: /\.pug$/,
        
        use: [
          "pug-loader"
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
              esModule: false,
              outputPath: './assets/images'
            }
          }
        ]
      }
		]
	},
	devServer: {
		publicPath: "/js"
	}
};
