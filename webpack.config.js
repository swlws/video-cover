const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    // new ModuleFederationPlugin({
    //     name: 'mainApp',
    //     remotes: {
    //         microApp1: 'microApp1@http://localhost:3002/remoteEntry.js',
    //         // microApp2: 'microApp2@http://localhost:3003/remoteEntry.js',
    //     },
    // }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
