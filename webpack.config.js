const path = require("path");

module.exports = {
  stats: { errorDetails: true },
  target: "web",
  output: {
    path: path.join(process.cwd(), "bin"),
    filename: "index.js",
  },
  // mode: 'production',
  mode: "production",
  devtool: "cheap-module-source-map",
  optimization: {
    sideEffects: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      buffer: require.resolve("buffer/"),
      url: require.resolve("core-js/"),
      os: require.resolve("os-browserify/browser")
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      }
    ],
  },
};
