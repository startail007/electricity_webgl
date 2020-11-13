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
      "@vue": path.resolve(__dirname, "./src/vue/"),
      //vue: "vue/dist/vue.esm.js",
    },
    //擴展副檔名
    extensions: [".js", ".json", ".vue"],
  },
  entry: {
    //main: "./src/js/index.js",
    "./1.base/js/main": "./src/1.base/index.js",
    "./2.filter/js/main": "./src/2.filter/index.js",
    "./3.glow/js/main": "./src/3.glow/index.js",
    "./4.spark/js/main": "./src/4.spark/index.js",
    "./5.electricity/js/main": "./src/5.electricity/index.js",
    "./6.wave/js/main": "./src/6.wave/index.js",
    "./7.noise/js/main": "./src/7.noise/index.js",
    "./8.noiseElectricity/js/main": "./src/8.noiseElectricity/index.js",
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
      //vue元件載入器
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      //css提取
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
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
              publicPath: "../",
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
      chunks: ["./1.base/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "2.filter",
      template: "./src/2.filter/index.html",
      filename: "2.filter/index.html",
      hash: true,
      chunks: ["./2.filter/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "3.glow",
      template: "./src/3.glow/index.html",
      filename: "3.glow/index.html",
      hash: true,
      chunks: ["./3.glow/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "4.spark",
      template: "./src/4.spark/index.html",
      filename: "4.spark/index.html",
      hash: true,
      chunks: ["./4.spark/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "5.electricity",
      template: "./src/5.electricity/index.html",
      filename: "5.electricity/index.html",
      hash: true,
      chunks: ["./5.electricity/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "6.wave",
      template: "./src/6.wave/index.html",
      filename: "6.wave/index.html",
      hash: true,
      chunks: ["./6.wave/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "7.noise",
      template: "./src/7.noise/index.html",
      filename: "7.noise/index.html",
      hash: true,
      chunks: ["./7.noise/js/main"],
    }),
    new HtmlWebpackPlugin({
      title: "8.noiseElectricity",
      template: "./src/8.noiseElectricity/index.html",
      filename: "8.noiseElectricity/index.html",
      hash: true,
      chunks: ["./8.noiseElectricity/js/main"],
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
