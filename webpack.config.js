const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    // new BundleAnalyzerPlugin(),
  ],
};
