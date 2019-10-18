const { pool } = require("../../core/database");

const getAuth = async (username) => {
   const text = 'SELECT * FROM users WHERE username=$1'
   const value = [username]
   try {
      const data = await pool.query(text, value)
      return data.rows
   } catch (err) {
      throw err
   }
}

const getUserLogin = async (id) => {
   const text = 'SELECT * FROM users WHERE id=$1'
   const value = [id]
   try {
      const data = await pool.query(text, value)
      return data.rows
   } catch (err) {
      throw err
   }
}

module.exports = {
   getAuth,
   getUserLogin
};