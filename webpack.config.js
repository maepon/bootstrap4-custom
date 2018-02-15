const webpack = require("webpack")

module.exports = {
  entry: './src/_javascript/common.js',
  output: {
    path: `${__dirname}/htdocs/assets/js`,
    filename: 'common.js'
  },

  externals: [
    {
      jquery: 'jQuery'
    }
  ],

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  module:{
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env',{modules: false}]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}
