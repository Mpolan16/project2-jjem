// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/manage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/manage.html"));
  });
};
