module.exports = {
  webpack5: true,
  ignoreBuildErrors: true,
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
  // webpack: config => {
  //   // Fixes npm packages that depend on `fs` module
  //   config.node = {
  //     fs: 'empty'
  //   }

  //   return config
  // }
}