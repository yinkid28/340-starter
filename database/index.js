const { Pool } = require("pg")
require("dotenv").config()

let pool
// Use a single configuration that works for Render Internal connections
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This allows the connection even if the certificate isn't "public"
  },
})

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