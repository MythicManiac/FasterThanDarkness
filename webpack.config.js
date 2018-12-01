const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.html"),
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPugin([{
      "from": path.resolve(__dirname, "./assets/**/*"),
      "to": path.resolve(__dirname, "./dist/")
    }])
  ],
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 80
  }
};
