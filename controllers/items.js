const express = require('express');
const router = express.Router();
const Item = require('../models/items.js');

router.get('/', (req, res) => {
  res.render('index.ejs')
});

module.exports = router;
