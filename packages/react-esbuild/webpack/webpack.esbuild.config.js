const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const chalk = require("chalk")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { ESBuildMinifyPlugin } = require("esbuild-loader")
const { ProvidePlugin } = require("webpack")

module.exports = {
  entry: {
    index: [path.resolve(__dirname, "../src/index")],
  },
  output: {
    filename: "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "[name].[chunkhash].chunk.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".", ".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "esbuild-loader", // 使用 esbuild 作为编译器
          options: {
            loader: "jsx", // Remove this if you're not using JSX
            target: "es2015", // Syntax to compile to (see options below for possible values)
          },
        },
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "ejs-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff)$/,
        use: ["file-loader?name=[hash:base64:7].[ext]"],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        // for node_module less
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  mode: "production",
  plugins: [
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../index.ejs"),
      filename: path.resolve(__dirname, "../dist/index.html"),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css",
    }),
    new ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      PropTypes: "prop-types",
    }),
  ],
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [new ESBuildMinifyPlugin()],
  },
}
