//Webpack requires this to work with directories
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const extract = require("mini-css-extract-plugin");

// This is main configuration object that tells Webpackw what to do. 
module.exports = {
  //path to entry paint
  entry: './src/index.js',
  //path and filename of the final output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true,
  devServer: {
    port: 3000,
    liveReload: true,
    contentBase: path.resolve(__dirname, 'dist'),
    // open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Output",
    }),
    new extract({
      filename: 'bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        //applying rule
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            //using file-loader
            loader: 'file-loader',
            options: {
              outputPath: "img"
            }
          }
          ]
      },
      {
        test:/\.(sa|sc|c)ss$/,
        use: [
          {
            loader: extract.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  }
}