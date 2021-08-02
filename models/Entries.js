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
    this.startDate = row.startDate
    this.finishDate = row.finishDate
    this.title = row.title
    this.author = row.author
    this.pageCount = row.pageCount
    this.starRating = row.starRating
    this.firstLine = row.firstLine
    this.lastLine = row.lastLine
    this.publishDate = row.publishDate
    this.reviewText = row.reviewText
  }

  static async Create() {
    try {
      await pool.query(
        `
        DROP TABLE IF EXISTS "entries";
        CREATE TABLE entries (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name TEXT NOT NULL,
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
          review_text TEXT NOT NULL
        );
      `
      )
      console.log('Created Entries table')
    } catch (error) {
      console.log(error)
    }
  }
}