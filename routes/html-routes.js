const db = require("../models");

module.exports = function(app){
  app.get("/", function (req, res) {
    db.Students.findAll({raw: true}).then(function(data) {
    console.log(data)
    res.render("index", {Students: data});
  })
});
};
