const withTM = require("next-transpile-modules")(["ui", "data"]);

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    const api_host = process.env.API_HOST || "http://localhost:4000";

    return [
      {
        source: "/api/:path*",
        destination: `${api_host}/api/:path*`, // Proxy to Backend
      },
      {
        source: "/rails/:path*",
        destination: `${api_host}/rails/:path*`, // Proxy to Backend
      },
    ];
  },
});
