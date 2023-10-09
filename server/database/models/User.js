const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  shipping: {
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zipCode: Number
    }
  },
  billing: {
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zipCode: Number
    },
    ccNumber: Number,
    ccExp: String,
    ccv: Number
  },
  selling: {
    isShopSetUp: Boolean,
    listings: [String],
    routing: Number,
    storeRating: Number
  }
})

module.exports = mongoose.model('User', userSchema, 'users')
