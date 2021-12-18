const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  phone: {
    type: String,
    minlength: 7
  },
  street: {
    type: String,
    required: true,
    minlength: 2
  },
  city: {
    type: String,
    required: true,
    minlength: 3
  },
  friendOf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', schema)