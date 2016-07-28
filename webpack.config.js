var clientConfig = {
  entry: [
      './client/src/'
  ],
  output: {
    path: './client/compiled/src',
    filename: 'bundle.js'
   },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        plugins: ['transform-decorators-legacy']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  }

};

var serverConfig = {
  entry: [
      './client/src/router.js',
  ],
  output: {
    path: './server/compiled/src',
    libraryTarget: 'commonjs2',
    filename: 'bundle.js'
  },
  target: 'node',
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = [
  clientConfig,
  serverConfig
];