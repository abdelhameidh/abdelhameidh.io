const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://mongodatabase6:mongodb123@cluster0.Itsmsm6.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import models
const User = require('./models/user');
const Menu = require('./models/menu');

// Create Express app
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/menu', (req, res) => {
  // Fetch menu items from the database
  Menu.find()
    .then((menuItems) => {
      res.render('menu', { menuItems, user: req.user });
    })
    .catch((error) => {
      console.error('Error fetching menu items:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in the database
  User.findOne({ email })
    .then((user) => {
      if (user && user.password === password) {
        // Set the user in the session
        req.user = user;
        res.redirect('/menu');
      } else {
        res.status(401).send('Invalid email or password');
      }
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/order', (req, res) => {
  const { item, quantity } = req.body;

  // Check if user is signed in
  if (!req.user) {
    res.status(401).send('Please sign in to place an order');
    return;
  }

  // Create the order in the database
  // Replace 'Order' with the actual name of your order model
  const order = new Order({
    user: req.user._id,
    item,
    quantity,
  });

  order.save()
    .then(() => {
      res.send('Order placed successfully');
    })
    .catch((error) => {
      console.error('Error placing order:', error);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
