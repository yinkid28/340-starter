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

// Route to build inventory management view (protected - Employee/Admin only)
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildManagement))

// --- Task 2: Add Classification Routes (protected - Employee/Admin only) ---
router.get("/add-classification", utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification));

// POST route with validation middleware added
router.post(
    "/add-classification",
    utilities.checkAccountType,
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
);

// --- Task 3: Add Inventory Routes (protected - Employee/Admin only) ---
router.get("/add-inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory));

// POST route with validation middleware added
router.post(
    "/add-inventory",
    utilities.checkAccountType,
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
);

module.exports = router;