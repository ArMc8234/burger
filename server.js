//Dependencies
//=====================================
var express = require("express");
var exphbs = require("express-handlebars");


//Set up Express Server
//=====================================
var app = express();
var PORT = process.env.PORT || 3000;

//Require the models to sync to the SQL database
var db = require("./models");

//Set up the Express app to be able to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static directory
app.use(express.static(_dirname + "/public"));

//Set up app to use express-handlebars engine with a default layout that we'll call "main"
//=========================================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
//======================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function(){
    app.listen(PORT, function(){
        console.log("App listening on: https://localhost:"+ PORT);
    });
});