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

  // GET route for getting all events
  app.get("/api/events", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Events.findAll({}).then(function(dbEvents) {
      // console.log(dbEvents)
      // We have access to the events as an argument inside of the callback function, but not needed
      res.json(dbEvents);
    });
  });

  // POST route for saving a new event
  app.post("/api/event", function(req, res) {
    // console.log(req.body.start)
    // console.log(req.body.end)
    db.Events.create({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }).then(function(dbEvent) {
      // We have access to the new event as an argument inside of the callback function
      res.json(dbEvent);
    });
  });  

  // DELETE route for deleting an event.
  app.delete("/api/event/:id", function(req, res) {
    // Use the sequelize destroy method to delete a record from our table with the
    // id in req.params.id. res.json the result back to the user
    db.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.end();
    })

  });

  // PUT route for updating an event.
  app.put("/api/event", function(req, res) {
            
    db.Events.update({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }, 
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbEvent) {
      // We have access to the new event as an argument inside of the callback function
      res.json(dbEvent);
    });
   });
};
