var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        db.Burger.findAll({}).then(function(dbBurger){
          res.render('index', {
          burgers: dbBurger
          });
        });
     });
}