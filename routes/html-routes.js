// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
var express = require("express");
var db = require('../models/students.js');

var router = express.Router();


  
  router.get("/", function(req, res) {
    db.all(function(data) {
      var hbsObject = {
        Students: data
      };
      console.log('hbsObject', hbsObject);
      res.render("index", hbsObject);
    });
  });

  // app.get("/manage", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/manage.html"));
  // });
  
module.exports = router;