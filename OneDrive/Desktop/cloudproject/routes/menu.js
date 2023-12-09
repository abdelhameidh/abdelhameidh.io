const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

// Menu page route
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.render('menu', { menuItems });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
