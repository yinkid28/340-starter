const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/* **********************************
 * Test Drive Booking Validation Rules
 * ********************************* */
validate.bookingRules = () => {
  return [
    body("inv_id")
      .trim()
      .isInt({ min: 1 })
      .withMessage("Invalid vehicle selection."),

    body("test_drive_date")
      .trim()
      .isDate()
      .withMessage("Please provide a valid date.")
      .custom((value) => {
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          throw new Error("Test drive date must be today or in the future.")
        }
        return true
      }),

    body("test_drive_time")
      .trim()
      .notEmpty()
      .withMessage("Please select a time slot."),

    body("test_drive_phone")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Please provide a valid phone number (at least 10 digits).")
      .matches(/^[\d\s\-\(\)\+]+$/)
      .withMessage("Phone number can only contain digits, spaces, and common symbols."),

    body("test_drive_message")
      .trim()
      .optional()
      .isLength({ max: 500 })
      .withMessage("Message must be less than 500 characters."),
  ]
}

/* ******************************
 * Check booking data and return errors or continue
 * ***************************** */
validate.checkBookingData = async (req, res, next) => {
  const { inv_id, test_drive_date, test_drive_time, test_drive_phone, test_drive_message } = req.body
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const vehicleData = await invModel.getInventoryById(inv_id)
    const vehicleName = vehicleData
      ? `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`
      : "Vehicle"

    res.render("test-drive/booking-form", {
      errors,
      title: `Book Test Drive - ${vehicleName}`,
      nav,
      vehicle: vehicleData,
      inv_id,
      test_drive_date,
      test_drive_time,
      test_drive_phone,
      test_drive_message,
    })
    return
  }
  next()
}

module.exports = validate
