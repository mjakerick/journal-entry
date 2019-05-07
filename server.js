// use dotenv to import configs from the .env file
require('dotenv').config()

// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const Entry = require('./models/entries.js');

// Configuration
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI

// Set Middleware
// allow us to use put and delete methods
app.use(methodOverride('_method'))
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }))

// configure sessions
// secret is stored in .env
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// Database config and connection
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT))

// Routes
app.get('/', (req, res) => {
  // res.send('index route')
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  })
})

// Gets entries from database and renders them on index page
app.get('/app', (req, res)=>{
    if(req.session.currentUser){
      Entry.find({}, (error, allEntries) => {
          res.render('app/entries/index.ejs',{
              entries:allEntries
          });
      })
    } else {
        res.redirect('/sessions/new');
    }
})

app.get('/new', (req, res)=>{
  res.render('app/entries/new.ejs')
})

app.post('/entries', (req, res)=>{
  Entry.create(req.body, (err, createdEntry) => {
    res.redirect('/app')
  })
})

app.get('/entries/:id', (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('app/entries/show.ejs', {
            entry: foundEntry
        });
    });
});

app.get('/entries/:id/edit', (req, res) => {
    Entry.findById(req.params.id, (err, foundEntry) => {
        res.render('app/entries/edit.ejs',{
            entry:foundEntry
        });
    })
});

app.put('/entries/:id', (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/app');
    })
});

app.delete('/entries/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/app');
    });
});

// Users controller - creates new users
const userController = require('./controllers/users.js')
app.use('/users', userController)

// Sessions controller - handles user sessions
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

// Entries controller - creates new entries
const entriesController = require('./controllers/entries.js')
app.use('/entries', entriesController)
