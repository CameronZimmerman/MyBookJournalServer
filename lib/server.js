require('dotenv').config()
const express = require('express')
const { urlencoded } = require('express')
const pool = require('./utils/pool')
const cors = require('cors')
const morgan = require('morgan')
const checkAuth = require('../middleware/check-auth')
const createAuth = require('../controllers/auth')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'))

const authRoutes = createAuth()

app.get('/', (req, res) => {
  res.json({hello: 'world'})
})
app.use('/auth', authRoutes)

app.use('/api', checkAuth)

app.use('/api/entries', require('../controllers/entries.js'))

const PORT = process.env.PORT || 1125

app.listen(PORT, () => {
  console.log(`started on ${PORT}`)
})