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
 // GET route for getting all of the table contents

    app.get("/api/burgers", function(req, res) {
 // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(dbBurger) {
// We have access to the table data as an argument inside of the callback function
// return res.json(dbBurger);
      res.json(dbBurger);
    });
  });
// POST route for saving a new table entry
  app.post("/api/burgers", function(req, res) {
// create takes an argument of an object describing the item we want to
// insert into our table. In this case we just we pass in an object with a text
// and complete property (req.body)
    db.Burger.create({
      title: req.body.title,
      devoured: false
    }).then(function(dbBurger) {
 // We have access to the new burgers as an argument inside of the callback function
      res.json(dbBurger);
    })
      .catch(function(err) {
  // Whenever a validation or flag fails, an error is thrown
 // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/burgers", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Burger.update({
      title: req.body.title,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
}