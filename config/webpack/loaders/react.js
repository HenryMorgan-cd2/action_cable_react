module.exports = {
  test: /\.(js|jsx)?(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      'es2015',
      'stage-0',
      'react',
    ],
    plugins: [
      'strict-equality',
      'transform-decorators-legacy',
    ]
  }
}
