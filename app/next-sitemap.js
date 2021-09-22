module.exports = {
  siteUrl: process.env.SITE_URL || "https://nemopi-dev.azurewebsites.net",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/profile" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/profile"],
};
