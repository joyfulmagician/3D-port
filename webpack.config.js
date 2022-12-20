const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/app.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    alias: {
      jsm: 'src/jsm'
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    // new CompressionPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // }),
    new CopyPlugin({
      patterns: [
        { from: "src/jsm", to: "jsm" }, //to the dist root directory
        { from: "*.html" },
        { from: "*.ico" },
        { from: "*.css" },
      ],
  }),
  ],
  devServer: {
    contentBase: path.join(__dirname, ''),
    compress: true,
    watchContentBase: true,
    port: 8080,
    host: 'localhost', //your ip address
    disableHostCheck: true, //coment these out for prod
  },
  node: {
    fs: 'empty',
  },
};
