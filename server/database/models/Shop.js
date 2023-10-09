const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
  sellerId: String,
  sellerName: String,
  name: String,
  description: String,
  sellingSince: Date,
  logoURL: String,
  bannerURL: String,
  listings: [String],
  itemReviews: [String],
  shopReviews: [String],
  shipsFrom: {
    city: String,
    state: String
  },
  stats: {
    productsSold: Number,
    followers: Number,
    rating: {
      rate: Number,
      count: Number
    }
  }
})

module.exports = mongoose.model('Shop', shopSchema, 'shops')
