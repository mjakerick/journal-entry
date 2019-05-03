const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//creates req.body
app.use(methodOverride('_method'));
// allows DELETE/PUT requests
app.use(express.urlencoded({extended:true}));

const itemsController = require('./controllers/items.js')
app.use('/items', itemsController)

app.listen(3000, () => {
  console.log('listening....');
});
mongoose.connect('mongodb://localhost:27017/project_2', { useNewUrlParser:true});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
})
