const express = require('express');
const entries = express.Router();
const Entry = require('../models/entries.js');

entries.get('/new', (req, res) => {
  res.render('app/entries/new.ejs')
})

module.exports = entries;
