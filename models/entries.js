const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = Schema({
  title: String,
  entry: String
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
