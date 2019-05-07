const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = Schema({
  date: String,
  title: String,
  entry: String
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
