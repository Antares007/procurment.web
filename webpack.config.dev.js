var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    './client.jsx'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/js/'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css!less-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.jsx$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.(eot|woff)$/, loader: 'file' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']
  }
};
