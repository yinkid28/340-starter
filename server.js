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
const staticRoutes = require("./routes/static");
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
 * Local Server Information
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});


