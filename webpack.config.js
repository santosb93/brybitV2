const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Development',
        template: 'index.html',
    })],
    mode: 'development',
    //mode: process.env.NODE_ENV,
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, '/build'),
            publicPath: '/build'
        },
        headers: {'Access-Control-Allow-Origin': '*',
                  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                  "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                 },
        proxy: {
            '/coins/**' : {
                target: 'http://localhost:3000/',
                secure: false,
            },
            '/users/**' : {
                target: 'http://localhost:3000/',
                secure: true,                
            }
        }
    },
    module: {
        rules: [
            {
              test: /\.jsx?/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          '@babel/preset-env',
                          '@babel/preset-react'
                      ]
                  }
              }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'images/'
                      }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader']

            },
            {
              test: /\.(move|mp4|mp3)$/,
              use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                      }
                    }
                  ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

          ]
    },
};