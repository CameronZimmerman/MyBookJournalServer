const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('..lib/utils/jwt');
const checkAuth = require('../middleware/check-auth')
const Users = require('../models/Users')

const getProfileWithToken = (user) => {
  const { hash, ...rest } = user;
  return {
    ...rest,
    token: jwt.sign({id: user.id})
  }
}

const createAuthRoutes = () => {
  const router = express.Router()

  router.get('/verify', checkAuth, (req, res) => {
    res.json({ verified: true })
  })

  router.post('/signup', async (req, res) => {
    const { password, ...user } = req.body
    const email = user.email

    if(!email || !password) {
      res.status(400).json({ error: 'email and password required' })
    }

    const foundUser = await Users.Select(email)

    if(foundUser) {
      res.status(400).json({ error: 'email already exists' })
    }

    const newUser = await Users.Insert(user, bcrypt.hashSync(password, 8))

    res.json(getProfileWithToken(newUser))
  })

  router.post('/signin', (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password

    if(!email || !password) {
      res.status(400).json({ error: 'email and password required' });
      return;
    }

    const foundUser = await Users.Select(email)
    if (!foundUser || !bcrypt.compareSync(password, user.hash)) {
      res.status(400).json({error: 'email or password not correct'})
      return
    }

    res.json(getProfileWithToken(foundUser))

  })

  return router
}

module.exports = createAuthRoutes