// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/") // Added this for handleErrors

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view (Task 1)
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// Route to trigger intentional error (Task 3)
router.get("/footer-error", utilities.handleErrors(invController.triggerError));

// This MUST match what the controller exported
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

module.exports = router;


