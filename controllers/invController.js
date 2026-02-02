const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 * Build vehicle detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryById(inv_id)
  const vehicleDisplay = await utilities.buildVehicleDetailGrid(data)
  let nav = await utilities.getNav()
  res.render("inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    vehicleDisplay,
  })
}

/* ***************************
 * Trigger an intentional 500 error (Task 3)
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  const error = new Error("Oh no! This is an intentional server error.")
  error.status = 500
  throw error // This sends the error to the middleware
}

// Export the entire object so all functions are available
module.exports = invCont;