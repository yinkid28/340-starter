// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
// REQUIRE THE VALIDATION MIDDLEWARE (Create this file next)
const invValidate = require('../utilities/inventory-validation') 

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// Route to trigger intentional error
router.get("/footer-error", utilities.handleErrors(invController.triggerError));
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// --- Task 2: Add Classification Routes ---
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// POST route with validation middleware added
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
);

// --- Task 3: Add Inventory Routes ---
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// POST route with validation middleware added
router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
);

module.exports = router;