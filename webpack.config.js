const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
// CSS 分离为单独的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// CSS 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const VcSign = require("./webpack/plugins/vc-sign/index")

module.exports = {
  // 模式
  mode: 'production',
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
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'webpack', 'loaders')]
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
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          "sass-loader"],
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
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
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
            maxSize: 10 // 小于10kb的图片会被 base64 处理
          }
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        }
      },
      {
        // 处理图标字体、媒体等资源
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.md$/i,
        use: [{
          loader: 'vc-markdown',
          options: {
            theme: 'block'
          }
        }]
      }
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
    // CSS 压缩，放在 plugins 中或者 optimization.minimizer 中都可以
    // new CssMinimizerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new VcSign()
    ]
  }
};
