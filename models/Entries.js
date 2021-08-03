const pool = require('../lib/utils/pool')

module.exports = class Entries {
  id
  date
  startDate
  finishDate
  title
  author
  pageCount
  starRating
  firstLine
  lastLine
  publishDate
  reviewText

  constructor(row) {
    this.id = row.id
    this.date = row.date
    this.startDate = row.start_date
    this.finishDate = row.finish_date
    this.title = row.title
    this.author = row.author
    this.pageCount = row.page_count
    this.starRating = row.star_rating
    this.firstLine = row.first_line
    this.lastLine = row.last_line
    this.publishDate = row.publish_date
    this.reviewText = row.review_text
  }

  static async Create() {
    try {
      await pool.query(
        `
        DROP TABLE IF EXISTS "entries" CASCADE;
        CREATE TABLE entries (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          entry_date DATE NOT NULL,
          start_date DATE NOT NULL,
          finish_date DATE NOT NULL,
          publish_date DATE NOT NULL,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          page_count INT NOT NULL,
          star_rating INT NOT NULL,
          first_line TEXT NOT NULL,
          last_line TEXT NOT NULL,
          review_text TEXT NOT NULL,
          user_id BIGINT,
          CONSTRAINT fk_user
            FOREIGN KEY(user_id)
              REFERENCES users(id)
        );
      `
      )
      console.log('Created Entries table')
    } catch (error) {
      console.log(error)
    }
  }

  static async Insert(body, userId) {
    try {
      const { rows } = await pool.query(
        `
        INSERT INTO entries (entry_date, start_date, finish_date, publish_date, title, author, page_count, star_rating, first_line, last_line, review_text, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        returning id, title
      `,
      [body.entryDate, body.startDate, body.finishDate, body.publishDate,
      body.title, body.author, body.pageCount, body.starRating, body.firstLine, body.lastLine, body.reviewText, userId]
      )
      return new Entries(rows[0])
    } catch (error) {
      console.log(error)
    }
  }
  static async getById(id) {
    try {
      const { rows } = await pool.query(
        `
        SELECT * FROM entries WHERE id = $1
      `,
      [id]
      )
      return new Entries(rows[0])
    } catch (error) {
      console.log(error)
    }
  }

  static async getByQuery(query, userId, sortBy) {
    try {
      console.log(query)
      const { rows } = await pool.query(
        `
        SELECT * FROM entries WHERE title ILIKE $1 OR author ILIKE $1 and user_id = $2
        ${sortBy? `ORDER BY ${sortBy} ASC`: ''}
      `,
      [`${query}%`, userId]
      )
      return rows.map(row => new Entries(row))
    } catch (error) {
      console.log(error)
    }
  }

  static async getAll(userId, sortBy) {
    try {
      const { rows } = await pool.query(
        `
        SELECT * FROM entries WHERE user_id = $1
        ${sortBy? `ORDER BY ${sortBy} ASC`: ''}
      `,
      [userId]
      )
      return rows.map((row) => new Entries(row))
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteById(id) {
    try {
      const { rows } = await pool.query(
        `
        DELETE FROM entries WHERE id = $1 RETURNING *
      `,
      [id]
      )
      return new Entries(rows[0])
    } catch (error) {
      console.log(error)
    }
  }
}