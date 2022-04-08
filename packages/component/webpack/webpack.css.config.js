const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const path = require("path")
const base = require("./webpack.base.config")

module.exports = merge(
  {},
  {
    entry: {
      index: "./src/index.less",
    },
    output: {
      path: path.resolve(__dirname, "../css/"),
    },
    mode: "production",
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "index.[chunkhash].css",
      }),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
  },
  base
)
