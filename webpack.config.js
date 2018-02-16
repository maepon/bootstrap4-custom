const webpack = require("webpack")

module.exports = env =>{
  const DEBUG = env.mode === 'DEV'
  return {
      entry: './src/_javascript/common.js',

      output: {
          path: `${__dirname}/htdocs/assets/js`,
          filename: 'common.js'
      },

      devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

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

}