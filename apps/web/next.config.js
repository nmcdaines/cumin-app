const withTM = require("next-transpile-modules")(["ui", "data"]);

module.exports = withTM({
  reactStrictMode: true,
});
