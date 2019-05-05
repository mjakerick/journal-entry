// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const methodOverride = require('method-override');

// config
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI

//creates req.body
app.use(methodOverride('_method'));
// allows DELETE/PUT requests
app.use(express.urlencoded({extended:false}));

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// listen
app.listen(3000, () => {
  console.log('listening....');
});

// Database config and connection
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})
