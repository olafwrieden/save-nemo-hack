module.exports = {
  webpack5: true,
  ignoreBuildErrors: true,
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
};
