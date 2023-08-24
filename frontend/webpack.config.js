const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  let production = argv.mode === 'production'
  return {
    entry: {
      'index': path.resolve(__dirname, 'src/index.js')
    },

    output: {
      filename: '[name].js',
      path: path.resolve('../assets/js/'),
      chunkFilename: '[name].js'
    },

    plugins: [
      new CleanWebpackPlugin({ dangerouslyAllowCleanPatternsOutsideProject: true }),
      // new HtmlWebpackPlugin({
      //   filename: '../../views/view-root.php',
      //   path: path.resolve('../views/'),
      //   template: __dirname + '/public/index.html',
      //   inject: 'true',
      //   chunks: ['webpackAssets'],
      //   // chunksSortMode: 'dependency'
      // }),
      new webpack.DefinePlugin({ "process.env.NODE_ENV": production ? JSON.stringify("production") : JSON.stringify("developmet") })
    ],

    devtool: !production && 'source-map',

    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", "ie>=11"]
                  }
                }
              ], {
                "include": [
                  "@babel/plugin-proposal-object-rest-spread"
                ]
              }
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/proposal-class-properties"
            ]
          }
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: ['style-loader', 'css-loader', 'sass-loader',],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1000000,
              name: '[name].[ext]',
              outputPath: '../img'
            }
          }]
        }
      ],
    },
  };
}
