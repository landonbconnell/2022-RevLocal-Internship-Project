const fs = require('fs')
const Product = require('../database/models/Product')

exports.getProductsByPage = async (req, res) => {
  try {
    const products = await Product.paginate(
      {},
      { page: req.params.page, limit: 12 }
    )
    res.status(200).json(products)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getProductsByCategory = async (req, res) => {
  try {
    const selectedCategories = req.params.category.split(',')
    const products = await Product.paginate(
      { category: { $in: selectedCategories } },
      { page: req.params.page, limit: 12 }
    )
    res.status(200).json(products)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getProductsBySeller = async (req, res) => {
  try {
    const products = await Product.paginate(
      { 'seller.id': req.params.seller },
      { page: req.params.page, limit: req.query.limit }
    )
    res.status(200).json(products)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id })
    res.status(200).json(product)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getProductsByTitle = async (req, res) => {
  try {
    const products = await Product.paginate(
      { title: { $regex: req.params.title, $options: 'i' } },
      { page: req.params.page, limit: 12 }
    )
    res.status(200).json(products)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct('category')
    res.status(200).json({ categories })
  } catch (err) {
    res.json({ message: err })
  }
}

exports.postNewProduct = async (req, res) => {
  try {
    const product = new Product({
      seller: {
        id: req.body.seller.id,
        name: req.body.seller.name
      },
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: {
        rate: req.body.rating.rate,
        count: req.body.rating.count
      }
    })
    await product.save()
    res.status(200).json(product._id)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.updateProductListing = async (req, res) => {
  try {
    const editedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    )
    await editedProduct.save()
    res.status(200).end()
  } catch (err) {
    res.json({ message: err })
  }
}

exports.deleteProductListing = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).end()
  } catch (err) {
    res.json({ message: err })
  }
}
