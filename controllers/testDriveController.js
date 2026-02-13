const utilities = require("../utilities/")
const testDriveModel = require("../models/test-drive-model")
const invModel = require("../models/inventory-model")

/* ****************************************
 * Build test drive booking form
 * *************************************** */
async function buildBookingForm(req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const vehicleData = await invModel.getInventoryById(inv_id)

  if (!vehicleData) {
    req.flash("notice", "Vehicle not found.")
    return res.redirect("/inv/")
  }

  const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`

  res.render("test-drive/booking-form", {
    title: `Book Test Drive - ${vehicleName}`,
    nav,
    errors: null,
    vehicle: vehicleData,
    inv_id,
    test_drive_date: "",
    test_drive_time: "",
    test_drive_phone: "",
    test_drive_message: "",
  })
}

/* ****************************************
 * Process test drive booking
 * *************************************** */
async function bookTestDrive(req, res) {
  let nav = await utilities.getNav()
  const { inv_id, test_drive_date, test_drive_time, test_drive_phone, test_drive_message } = req.body
  const account_id = res.locals.accountData.account_id

  const vehicleData = await invModel.getInventoryById(inv_id)
  const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`

  const result = await testDriveModel.createTestDrive(
    account_id,
    inv_id,
    test_drive_date,
    test_drive_time,
    test_drive_phone,
    test_drive_message
  )

  if (result) {
    req.flash("notice", `Test drive for ${vehicleName} booked successfully! We will contact you to confirm.`)
    res.redirect("/test-drive/my-bookings")
  } else {
    req.flash("notice", "Sorry, the booking failed. Please try again.")
    res.status(501).render("test-drive/booking-form", {
      title: `Book Test Drive - ${vehicleName}`,
      nav,
      errors: null,
      vehicle: vehicleData,
      inv_id,
      test_drive_date,
      test_drive_time,
      test_drive_phone,
      test_drive_message,
    })
  }
}

/* ****************************************
 * Build user's bookings page
 * *************************************** */
async function buildMyBookings(req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const bookings = await testDriveModel.getTestDrivesByAccountId(account_id)

  res.render("test-drive/my-bookings", {
    title: "My Test Drive Bookings",
    nav,
    errors: null,
    bookings,
  })
}

/* ****************************************
 * Build admin manage bookings page
 * *************************************** */
async function buildManageBookings(req, res, next) {
  let nav = await utilities.getNav()
  const bookings = await testDriveModel.getAllTestDrives()

  res.render("test-drive/manage", {
    title: "Manage Test Drive Bookings",
    nav,
    errors: null,
    bookings,
  })
}

/* ****************************************
 * Update test drive status (admin)
 * *************************************** */
async function updateStatus(req, res) {
  const { test_drive_id, test_drive_status } = req.body

  const result = await testDriveModel.updateTestDriveStatus(test_drive_id, test_drive_status)

  if (result) {
    req.flash("notice", `Booking status updated to "${test_drive_status}".`)
  } else {
    req.flash("notice", "Sorry, the status update failed.")
  }

  res.redirect("/test-drive/manage")
}

/* ****************************************
 * Cancel test drive booking (user)
 * *************************************** */
async function cancelBooking(req, res) {
  const test_drive_id = parseInt(req.params.test_drive_id)
  const account_id = res.locals.accountData.account_id

  // Verify the booking belongs to this user
  const booking = await testDriveModel.getTestDriveById(test_drive_id)

  if (!booking || booking.account_id !== account_id) {
    req.flash("notice", "Booking not found or access denied.")
    return res.redirect("/test-drive/my-bookings")
  }

  const result = await testDriveModel.deleteTestDrive(test_drive_id)

  if (result) {
    req.flash("notice", "Test drive booking cancelled successfully.")
  } else {
    req.flash("notice", "Sorry, could not cancel the booking.")
  }

  res.redirect("/test-drive/my-bookings")
}

module.exports = {
  buildBookingForm,
  bookTestDrive,
  buildMyBookings,
  buildManageBookings,
  updateStatus,
  cancelBooking
}
