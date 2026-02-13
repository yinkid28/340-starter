const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const testDriveController = require("../controllers/testDriveController")
const testDriveValidate = require("../utilities/test-drive-validation")

// Route to build booking form (must be logged in)
router.get(
  "/book/:inv_id",
  utilities.checkLogin,
  utilities.handleErrors(testDriveController.buildBookingForm)
)

// Route to process test drive booking (must be logged in)
router.post(
  "/book",
  utilities.checkLogin,
  testDriveValidate.bookingRules(),
  testDriveValidate.checkBookingData,
  utilities.handleErrors(testDriveController.bookTestDrive)
)

// Route to view user's bookings (must be logged in)
router.get(
  "/my-bookings",
  utilities.checkLogin,
  utilities.handleErrors(testDriveController.buildMyBookings)
)

// Route to cancel a booking (must be logged in)
router.get(
  "/cancel/:test_drive_id",
  utilities.checkLogin,
  utilities.handleErrors(testDriveController.cancelBooking)
)

// Route to manage all bookings (Employee/Admin only)
router.get(
  "/manage",
  utilities.checkAccountType,
  utilities.handleErrors(testDriveController.buildManageBookings)
)

// Route to update booking status (Employee/Admin only)
router.post(
  "/update-status",
  utilities.checkAccountType,
  utilities.handleErrors(testDriveController.updateStatus)
)

module.exports = router
