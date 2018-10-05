const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('../index');

module.exports = {

  // mode: 'development',
  name: 'server',
  target: 'node',

  // devtool: 'source-map',

  entry: {
    app: [
      // './src/server/index'
      path.resolve(__dirname, '../../src/server/index.js')
    ]
  },


  externals: [
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      whitelist: /\.css$/,
    }),
  ],

  output: {
    path: path.resolve(__dirname, '../../dist/server'),
    filename: 'server.js',
    publicPath: config.public_path + "/"
  },

  resolveLoader: {
    moduleExtensions: ["-loader"]
  },

  module: {
    rules: [

      // js 文件解析
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel'
        /*
        query: {
          cacheDirectory: true,
          plugins: [
            // http://technologyadvice.github.io/es7-decorators-babel6/
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'react', 'stage-0']
        }
        */
      },

      // scss 文件解析
      {
        test: /\.scss$/,
        use: [
          {
            loader: `css/locals`,
            options: {
              modules: true,
              localIdentName: config.class_scoped_name,
              minimize: true,
              sourceMap: true

              // camelCase: true,
              // importLoaders: 1,
              // modules: true,
              // localIdentName: config.class_scoped_name
            }
          },
          { loader: `sass` },
        ]
      }

    ]
  },

  plugins: [
  ]
}
