const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = (env, argv) => {
  const isDevMode = argv.mode !== "production";

  const cleanWebpackPlugin = new CleanWebpackPlugin(["build"]);

  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/client/src/index.html"
  });

  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: isDevMode ? "[name].css" : "[name].[hash].css",
    chunkFilename: isDevMode ? "[id].css" : "[id].[hash].css"
  });

  const uglifyJsPlugin = new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: false
  });

  const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  });

  const faviconsWebpackPlugin = new FaviconsWebpackPlugin(
    "./src/client/src/assets/img/icons/favicon.png"
  );

  return {
    entry: isDevMode
      ? [
          "react-hot-loader/patch",
          //activate HMR for React

          "webpack-dev-server/client?http://localhost:8080",
          //bundle the client for webpack dev server
          //and connect to the provided endpoint

          "webpack/hot/only-dev-server",
          //bundle the client for hot reloading
          //only- means to only hot reload for successful updates

          "babel-polyfill",
          "./src/client/src/index.jsx"
        ]
      : ["babel-polyfill", "./src/client/src/index.jsx"],
    output: {
      filename: "[name]-[hash].js",
      path: path.join(__dirname, "/build"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                camelCase: true,
                localIdentName: isDevMode
                  ? "[name]__[local]__[hash:base64:5]"
                  : "[name]__[local]__[hash:base64:5]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [
                  require("autoprefixer")({ browsers: "last 3 versions" })
                ]
              }
            },
            { loader: "resolve-url-loader" },
            {
              loader: "sass-loader",
              options: {
                data: '@import "vars"; @import "mixins"; @import "utils";',
                includePaths: ["./src/client/src/assets/sass"]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
          loader: "url-loader",
          options: {
            limit: 10000
          }
        },
        {
          test: /\.svg$/,
          loader: "svg-react-loader"
        }
      ]
    },
    resolve: {
      modules: ["node_modules", "src/client/src"],
      extensions: [".js", ".jsx"]
    },
    optimization: isDevMode
      ? {
          minimizer: [uglifyJsPlugin, optimizeCSSAssetsPlugin]
        }
      : {},
    plugins: isDevMode
      ? [
          cleanWebpackPlugin,
          htmlWebpackPlugin,
          miniCssExtractPlugin,
          faviconsWebpackPlugin,
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
          new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true
          }),
          new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true)
          }),
        ]
      : [
          cleanWebpackPlugin,
          htmlWebpackPlugin,
          miniCssExtractPlugin,
          faviconsWebpackPlugin,
          new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true)
          }),
        ],
    devServer: {
      historyApiFallback: true,
      hot: true,
      contentBase: "/build",
      publicPath: "/",
      watchOptions: {
        ignored: "/node_modules/"
      }
    }
  };
};
