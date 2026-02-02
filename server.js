/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const app = express();

// REQUIRE YOUR ROUTES AND UTILITIES
const inventoryRoute = require("./routes/inventoryRoute")
const staticRoutes = require("./routes/static");
const utilities = require("./utilities/") 
const baseController = require("./controllers/baseController");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes);

// Index route
app.get("/", baseController.buildHome);

// Inventory routes
app.use("/inv", inventoryRoute)

/* ***********************
 * File Not Found Route
 * Task 2: Place this AFTER all other routes but BEFORE the error handler
 *************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Task 2 & 3: Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav() 
  console.error(`Error at: "${req.path}": ${err.message}`)
  res.status(err.status || 500).render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 10000 ;
const host = process.env.HOST;

/* ***********************
 * Log statement
 *************************/
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});