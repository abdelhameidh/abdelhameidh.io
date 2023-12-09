const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Login page route
router.get('/login', (req, res) => {
  res.render('login');
});

// Login form submission route
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Register page route
router.get('/register', (req, res) => {
  res.render('register');
});

// Register form submission route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    await User.register(user, password);
    res.redirect('/user/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
