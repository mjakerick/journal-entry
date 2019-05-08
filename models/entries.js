const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = Schema({
  userId: String,
  date: String,
  title: String,
  entry: String
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
