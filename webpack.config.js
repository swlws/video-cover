const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: "./dist",
    },
    port: 9000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        // CSS 解析
        test: /\.(sass|scss)$/,
        // 去除 CSS Module 解析
        exclude: /\.module\.(css|scss)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // CSS Module 解析
        test: /\.module\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]___[hash:base64:5]", // 自定义的类名格式
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
