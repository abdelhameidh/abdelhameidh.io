const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Reservation page route
router.get('/', (req, res) => {
  res.render('reservation');
});

// Create reservation route
router.post('/', async (req, res) => {
  try {
    const { name, date, time, guests } = req.body;
    const reservation = new Reservation({
      name,
      date,
      time,
      guests,
    });
    await reservation.save();
    res.redirect('/reservations');
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
