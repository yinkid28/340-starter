const pool = require("../database/")

/* *****************************
 * Create a new test drive booking
 * ***************************** */
async function createTestDrive(account_id, inv_id, test_drive_date, test_drive_time, test_drive_phone, test_drive_message) {
  try {
    const sql = `
      INSERT INTO public.test_drive
      (account_id, inv_id, test_drive_date, test_drive_time, test_drive_phone, test_drive_message)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`
    return await pool.query(sql, [account_id, inv_id, test_drive_date, test_drive_time, test_drive_phone, test_drive_message])
  } catch (error) {
    console.error("createTestDrive error:", error)
    return null
  }
}

/* *****************************
 * Get test drives by account ID (for user's bookings)
 * ***************************** */
async function getTestDrivesByAccountId(account_id) {
  try {
    const sql = `
      SELECT td.*, i.inv_make, i.inv_model, i.inv_year, i.inv_thumbnail
      FROM public.test_drive td
      JOIN public.inventory i ON td.inv_id = i.inv_id
      WHERE td.account_id = $1
      ORDER BY td.test_drive_date DESC, td.test_drive_time DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getTestDrivesByAccountId error:", error)
    return []
  }
}

/* *****************************
 * Get all test drives (for admin)
 * ***************************** */
async function getAllTestDrives() {
  try {
    const sql = `
      SELECT td.*, i.inv_make, i.inv_model, i.inv_year,
             a.account_firstname, a.account_lastname, a.account_email
      FROM public.test_drive td
      JOIN public.inventory i ON td.inv_id = i.inv_id
      JOIN public.account a ON td.account_id = a.account_id
      ORDER BY td.test_drive_date ASC, td.test_drive_time ASC`
    const result = await pool.query(sql)
    return result.rows
  } catch (error) {
    console.error("getAllTestDrives error:", error)
    return []
  }
}

/* *****************************
 * Get test drive by ID
 * ***************************** */
async function getTestDriveById(test_drive_id) {
  try {
    const sql = `
      SELECT td.*, i.inv_make, i.inv_model, i.inv_year,
             a.account_firstname, a.account_lastname, a.account_email
      FROM public.test_drive td
      JOIN public.inventory i ON td.inv_id = i.inv_id
      JOIN public.account a ON td.account_id = a.account_id
      WHERE td.test_drive_id = $1`
    const result = await pool.query(sql, [test_drive_id])
    return result.rows[0]
  } catch (error) {
    console.error("getTestDriveById error:", error)
    return null
  }
}

/* *****************************
 * Update test drive status (for admin)
 * ***************************** */
async function updateTestDriveStatus(test_drive_id, test_drive_status) {
  try {
    const sql = `
      UPDATE public.test_drive
      SET test_drive_status = $1
      WHERE test_drive_id = $2
      RETURNING *`
    return await pool.query(sql, [test_drive_status, test_drive_id])
  } catch (error) {
    console.error("updateTestDriveStatus error:", error)
    return null
  }
}

/* *****************************
 * Delete test drive booking
 * ***************************** */
async function deleteTestDrive(test_drive_id) {
  try {
    const sql = `DELETE FROM public.test_drive WHERE test_drive_id = $1 RETURNING *`
    return await pool.query(sql, [test_drive_id])
  } catch (error) {
    console.error("deleteTestDrive error:", error)
    return null
  }
}

module.exports = {
  createTestDrive,
  getTestDrivesByAccountId,
  getAllTestDrives,
  getTestDriveById,
  updateTestDriveStatus,
  deleteTestDrive
}
