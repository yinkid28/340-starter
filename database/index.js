const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool
 * Force SSL globally to ensure Render stays connected
 * *************** */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Export the query function for use in the models
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
}