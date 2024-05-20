const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

console.log(path.resolve(__dirname, 'src'))

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
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
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
        use: [
          // 将 css 写在 js 文件中
          // "style-loader",
          // 将 css 抽离为单独的文件，以 link 的方式引入
          MiniCssExtractPlugin.loader,
          "css-loader", "sass-loader"],
      },
      {
        // CSS Module 解析
        test: /\.module\.(css|scss)$/,
        use: [
          // 将 css 写在 js 文件中
          // "style-loader",
          // 将 css 抽离为单独的文件，以 link 的方式引入
          MiniCssExtractPlugin.loader,
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
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被 base64 处理
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // chunk 的大小保持在 10000 个字符
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000, // Minimum number of characters
    }),
  ],
};
