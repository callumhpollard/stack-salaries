module.exports = {
  entry: [
      './client/src/components/app.jsx',
      './client/src/components/cloud.jsx',
      './client/src/components/footer.jsx',
      './client/src/components/login.jsx',
      './client/src/components/logo.jsx',
      './client/src/components/main.jsx',
      './client/src/components/login-form.jsx',
      './client/src/components/results.jsx',
      './client/src/components/search.jsx',
      './client/src/index.js',
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
        presets: ['react', 'es2015', 'stage-1']
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