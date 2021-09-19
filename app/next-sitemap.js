import { APP_BASE_URL as siteUrl } from "./constants/AppConfig";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/profile" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/profile"],
};
