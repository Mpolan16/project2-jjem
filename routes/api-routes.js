// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all calendar events
  app.get("/api/calendar", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Calendar.findAll({}).then(function(dbCalendar) {
      // console.log(dbCalendar)
      // We have access to the events as an argument inside of the callback function, but not needed
      res.json(dbCalendar);
    });
  });

  // GET route for getting all students
  app.get("/api/students", function(req, res) {
    db.Students.findAll({}).then(function(dbStudents) {      
      res.json(dbStudents);
    });
  });  

  // GET route for getting one student
  app.get("/api/students/:id", function(req, res) {
    db.Students.findOne({
      where: {
        id: req.params.id
      }      
    }).then(function(dbStudent) {      
      res.json(dbStudent);
    });
  });

  // POST route for saving a new event
  app.post("/api/calendar", function(req, res) {
    // console.log(req.body.start)
    // console.log(req.body.end)
    db.Calendar.create({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }).then(function(dbCalendar) {
      // We have access to the new event as an argument inside of the callback function
      res.json(dbCalendar);
    });
  });  

  // POST route for saving a new student
  app.post("/api/student", function(req, res) {
    db.Students.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }).then(function(dbStudent) {      
      res.json(dbStudent);
    });
  });   

  // DELETE route for deleting an event.
  app.delete("/api/calendar/:id", function(req, res) {
    // Use the sequelize destroy method to delete a record from our table with the
    // id in req.params.id. res.json the result back to the user
    db.Calendar.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.end();
    })
  });

  // DELETE route for deleting a student.
  app.delete("/api/student/:id", function(req, res) {
    db.Students.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.end();
    })
  });  

  // PUT route for updating an event.
  app.put("/api/calendar", function(req, res) {
            
    db.Calendar.update({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }, 
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbCalendar) {
      // We have access to the new event as an argument inside of the callback function
      res.json(dbCalendar);
    });
  });

  // PUT route for updating a student.
  app.put("/api/student", function(req, res) {
            
    db.Students.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }, 
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbStudent) {      
      res.json(dbStudent);
    });
  });
};