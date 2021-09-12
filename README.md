# Eat Da Burger

![Screenshot](./public/images/EatDaBurger2.png)
## Description

**Eat Da Burger** is an application that takes user input into a sql table then posts all table entries in one of two tables based on a boolean state.

## Technologies
SQL, Sequelize, Handlebars, and Bootstrap

## Goal
The goal of the project was to create a simple MVC. The app uses Sequelize to set up the model structure as an alternative to using ORM. The collection consisted of two columns: a burger name and a boolean confirming if the burger was devoured.  The view contained a simple form that possessed a couple of **CRUD** operations.  The user is able to ***Create*** a new burger with a "devoured" boolean defaulted to false. There is a ***Read*** function to find the new burgers that have been added to the database and display them back within the index page that is displayed through a Handlebars template.  Lastly, the user can ***Update*** the burgers in the database by selecting the "devour" button, which changes the devoured boolean from false to true.

You can view the project at https://ancient-river-20695.herokuapp.com/