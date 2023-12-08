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

// Create Express app
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/menu', (req, res) => {
  // Fetch menu items from the database
  // Replace 'Menu' with the actual name of your menu model
  Menu.find()
    .then((menuItems) => {
      res.render('menu', { menuItems });
    })
    .catch((error) => {
      console.error('Error fetching menu items:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
