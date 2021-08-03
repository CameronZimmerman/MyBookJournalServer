const { query } = require('express')
const express = require('express')
const router = express.Router()
const Entries = require('../models/Entries')

router
  .post('/', async(req, res, next) => {
    try {
      const entry = await Entries.Insert(req.body, req.userId)
      res.json(entry)
    } catch(err) {
      console.log(err)
    }
      
  })

  .get('/', async(req, res, next) => {
    const sortBy = req.query.sortBy
    try {
      const entries = await Entries.getAll(req.userId, sortBy)
      res.json(entries)
    } catch(err) {
      console.log(err)
    }

  })

  .get('/search', async(req, res, next) => {
    const query = req.query.query
    const sortBy = req.query.sortBy

    try {
      const entries = await Entries.getByQuery(query, req.userId, sortBy)
      res.json(entries)
    } catch(err) {
      console.log(err)
    }

  })
module.exports = router