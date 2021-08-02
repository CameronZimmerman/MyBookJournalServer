const pool = require('../lib/utils/pool')

module.exports = class Users {
  id
  name
  email
  hash

  constructor(row) {
    this.id = row.id
    this.name = row.name
    this.email = row.email
    this.hash = row.hash
  }

  static async Create() {
    try {
      await pool.query(
        `
        DROP TABLE IF EXISTS "users";
        CREATE TABLE users (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          hash TEXT NOT NULL
        );
      `
      )
      console.log('Created Users table')
    } catch (error) {
      console.log(error)
    }
  }
  static async Insert(user, hash) {
    try {
      const { rows } = await pool.query(
        `
        INSERT INTO users (email, name, hash)
        VALUES ($1, $2, $3)
        returning id, email, name;
      `,
      [user.email, user.name, hash]
      )
      
      return rows[0]
    } catch (error) {
      console.log(error)
    }
  }
  static async Select(email) {
    try {
      const { rows } = await pool.query(
        `
        SELECT id, email, name, hash
        FROM users
        WHERE email = $1;
      `,
      [email]
      )
      return rows[0]
    } catch (error) {
      console.log(error)
    }
  }
}