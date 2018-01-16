module.exports = {
  vendorName: 'vendor/vendor',
  devPort: 8082,
  spa: true,
  appEntries: './index.js',
  entry: ["babel-polyfill", "./index.js"],
  htmlWebpackOptions: {
    hash: 6,
    minify: false
  }
};
