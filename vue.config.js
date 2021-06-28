module.exports = {
  devServer: {
    proxy: "https://api.warframe.market",
    port: 13577,
    disableHostCheck: true,
  },
};
