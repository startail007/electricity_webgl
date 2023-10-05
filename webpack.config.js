const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); //壓縮css
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除檔案資料
module.exports = {
  /*build: {
    assetsPublicPath: "/dist/",
    assetsSubDirectory: "/dist/",
  },*/
  resolve: {
    //擴展路徑別名
    alias: {
      "@fonts": path.resolve(__dirname, "./src/fonts/"),
      "@img": path.resolve(__dirname, "./src/img/"),
      "@css": path.resolve(__dirname, "./src/css/"),
      "@js": path.resolve(__dirname, "./src/js/"),
      "@src": path.resolve(__dirname, "./src/"),
      //"@vue": path.resolve(__dirname, "./src/vue/"),
      //vue: "vue/dist/vue.esm.js",
    },
    //擴展副檔名
    extensions: [".js", ".json", ".vue"],
  },
  entry: {
    //main: "./src/js/index.js",
    "1.base/main": "./src/1.base/index.js",
    "2.filter/main": "./src/2.filter/index.js",
    "3.glow/main": "./src/3.glow/index.js",
    "4.spark/main": "./src/4.spark/index.js",
    "5.electricity/main": "./src/5.electricity/index.js",
    "6.wave/main": "./src/6.wave/index.js",
    "7.noise/main": "./src/7.noise/index.js",
    "8.noiseElectricity/main": "./src/8.noiseElectricity/index.js",
    "9.coordinate/main": "./src/9.coordinate/index.js",
    "10.curve/main": "./src/10.curve/index.js",
    "11.model/main": "./src/11.model/index.js",
    "12.model_1/main": "./src/12.model_1/index.js",
    "13.model_2/main": "./src/13.model_2/index.js",
    "14.model_3/main": "./src/14.model_3/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    //publicPath: "/assets/",
    filename: "[name].[hash].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9001,
    inline: true,
  },
  module: {
    rules: [
      //glsl
      {
        test: /\.(glsl|vs|fs)$/,
        loader: "webpack-glsl-loader",
      },
      /*//vue元件載入器
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },*/
      //css提取
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //publicPath: "../",
              //outputPath: "css/",
              //publicPath: "../css",
            },
          },
          "css-loader",
        ],
      },
      //sass scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //publicPath: "../",
              //outputPath: "css/",
              //publicPath: "../css",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      //圖檔載入器
      {
        test: /\.(png|jpg|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "img/",
              publicPath: "../img",
            },
          },
        ],
      },
      /*{
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000, //bytes
            name: "[hash:7].[ext]",
            outputPath: "assets",
          },
        },
      },*/
      //字型載入器
      {
        test: /\.(woff|woff2|eot|ttf|otf|ttc)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[hash].[ext]",
              /*publicPath: "../",*/
              //outputPath: "./",
            },
          },
        ],
      },
      //html
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      //js轉舊
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      //cleanOnceBeforeBuildPatterns: ["./js/*", "./css/*", "./fonts/*", "./index,html"],
      cleanOnceBeforeBuildPatterns: ["./*"],
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].[hash].css" }),
    new HtmlWebpackPlugin({
      title: "電流效果webgl",
      template: "./src/index.html",
      filename: "index.html",
      hash: true,
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      title: "1.base",
      template: "./src/1.base/index.html",
      filename: "1.base/index.html",
      hash: true,
      chunks: ["1.base/main"],
    }),
    new HtmlWebpackPlugin({
      title: "2.filter",
      template: "./src/2.filter/index.html",
      filename: "2.filter/index.html",
      hash: true,
      chunks: ["2.filter/main"],
    }),
    new HtmlWebpackPlugin({
      title: "3.glow",
      template: "./src/3.glow/index.html",
      filename: "3.glow/index.html",
      hash: true,
      chunks: ["3.glow/main"],
    }),
    new HtmlWebpackPlugin({
      title: "4.spark",
      template: "./src/4.spark/index.html",
      filename: "4.spark/index.html",
      hash: true,
      chunks: ["4.spark/main"],
    }),
    new HtmlWebpackPlugin({
      title: "5.electricity",
      template: "./src/5.electricity/index.html",
      filename: "5.electricity/index.html",
      hash: true,
      chunks: ["5.electricity/main"],
    }),
    new HtmlWebpackPlugin({
      title: "6.wave",
      template: "./src/6.wave/index.html",
      filename: "6.wave/index.html",
      hash: true,
      chunks: ["6.wave/main"],
    }),
    new HtmlWebpackPlugin({
      title: "7.noise",
      template: "./src/7.noise/index.html",
      filename: "7.noise/index.html",
      hash: true,
      chunks: ["7.noise/main"],
    }),
    new HtmlWebpackPlugin({
      title: "8.noiseElectricity",
      template: "./src/8.noiseElectricity/index.html",
      filename: "8.noiseElectricity/index.html",
      hash: true,
      chunks: ["8.noiseElectricity/main"],
    }),
    new HtmlWebpackPlugin({
      title: "9.coordinate",
      template: "./src/9.coordinate/index.html",
      filename: "9.coordinate/index.html",
      hash: true,
      chunks: ["9.coordinate/main"],
    }),
    new HtmlWebpackPlugin({
      title: "10.curve",
      template: "./src/10.curve/index.html",
      filename: "10.curve/index.html",
      hash: true,
      chunks: ["10.curve/main"],
    }),
    new HtmlWebpackPlugin({
      title: "11.model",
      template: "./src/11.model/index.html",
      filename: "11.model/index.html",
      hash: true,
      chunks: ["11.model/main"],
    }),
    new HtmlWebpackPlugin({
      title: "12.model_1",
      template: "./src/12.model_1/index.html",
      filename: "12.model_1/index.html",
      hash: true,
      chunks: ["12.model_1/main"],
    }),
    new HtmlWebpackPlugin({
      title: "13.model_2",
      template: "./src/13.model_2/index.html",
      filename: "13.model_2/index.html",
      hash: true,
      chunks: ["13.model_2/main"],
    }),
    new HtmlWebpackPlugin({
      title: "14.model_3",
      template: "./src/14.model_3/index.html",
      filename: "14.model_3/index.html",
      hash: true,
      chunks: ["14.model_3/main"],
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
