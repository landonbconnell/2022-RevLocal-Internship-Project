const fs = require('fs')
const Shop = require('../database/models/Shop')

exports.createNewShop = async (req, res) => {
  try {
    const shop = new Shop({
      sellerId: req.body.sellerId,
      sellerName: req.body.sellerName,
      name: undefined,
      description: undefined,
      sellingSince: Date.now(),
      logoURL: undefined,
      bannerURL: undefined,
      listings: [],
      itemReviews: [],
      shopReviews: [],
      shipsFrom: {
        city: undefined,
        state: undefined
      },
      stats: {
        productsSold: 0,
        followers: 0,
        rating: {
          rate: 0,
          count: 0
        }
      }
    })
    await shop.save((err, result) => {
      id = result._id.toString()
      res.status(200).json({ id })
    })
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getShopData = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId)
    res.status(200).json({ shop })
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getShopIdBySellerId = async (req, res) => {
  try {
    const shop = await Shop.find({ sellerId: req.params.sellerId })
    res.status(200).json({ shopId: shop[0]._id })
  } catch (err) {
    res.json({ message: err })
  }
}

exports.updateShopProp = async (req, res) => {
  try {
    const shop = await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      req.body
    )
    await shop.save()
    res.status(200).end()
  } catch (err) {
    res.json({ message: err })
  }
}

exports.isUniqueLogin = async (req, res) => {
  try {
    let isUniqueLogin = true
    const shop = await Shop.exists({ name: req.params.name })
    if (shop) {
      isUniqueLogin = false
    }
    res.status(200).json({ isUniqueLogin })
  } catch (err) {
    res.json({ message: err })
  }
}

exports.sellerHasAShop = async (req, res) => {
  try {
    let id = null
    let sellerHasAShop = false
    const shop = await Shop.exists({ sellerId: req.params.sellerId })
    if (shop) {
      sellerHasAShop = true
      id = shop._id
    }
    res.status(200).json({ sellerHasAShop, id })
  } catch (err) {
    res.json({ message: err })
  }
}
