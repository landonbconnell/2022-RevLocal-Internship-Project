const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
  seller: {
    id: String,
    name: String
  },
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  }
})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', productSchema, 'products')
