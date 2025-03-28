const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/gm_middleware_frontend/", // ✅ Change from "/" to ""
  },

  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true, // ✅ Redirects all requests to index.html
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // ✅ Add this rule for images
        type: "asset/resource",
      },
      {
        test: /\.svg$/, // ✅ Handles SVGs separately
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public/assets", to: "assets" }],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
