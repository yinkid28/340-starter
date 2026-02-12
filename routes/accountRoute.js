// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
// Validation file for Task 5
const regValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Task 3: Default route for Account Management (delivered after login)
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagementView))

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process registration with validation
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(), // Ensure you have these in account-validation.js
  regValidate.checkRegData, // Reuse this to check for validation errors
  utilities.handleErrors(accountController.accountLogin)
)


// Task 5: Route to deliver the update view
router.get("/update/:account_id", utilities.handleErrors(accountController.buildUpdateView));

// Task 5: Route to process the account update
router.post(
  "/update",
  regValidate.updateAccountRules(), // You'll need to create these rules
  regValidate.checkUpdateData,      // And this check function
  utilities.handleErrors(accountController.updateAccount)
);

// Task 5: Route to process the password update
router.post(
  "/password",
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword)
);

// Task 6: Logout route
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router