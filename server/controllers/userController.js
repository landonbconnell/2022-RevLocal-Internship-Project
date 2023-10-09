const fs = require('fs')
const User = require('../database/models/User')

exports.createNewUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      shipping: {
        address: {
          street1: undefined,
          street2: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined
        }
      },
      billing: {
        address: {
          street1: undefined,
          street2: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined
        },
        ccNumber: undefined,
        ccExp: undefined,
        ccv: undefined
      },
      selling: {
        isShopSetUp: false,
        listings: [],
        routing: undefined,
        storeRating: undefined
      }
    })
    await user.save()
    res.status(200).end()
  } catch (err) {
    res.json({ message: err })
  }
}

exports.isValidLogin = async (req, res) => {
  try {
    let isValidLogin = false
    const userId = await User.exists({ username: req.params.username })

    if (userId) {
      const user = await User.findById(userId)
      if (user.password === req.params.password) {
        isValidLogin = user
      }
    }
    res.status(200).json(isValidLogin)
  } catch (err) {
    res.json({ message: err })
  }
}

exports.updateShippingAddress = async (req, res) => {
  try {
    const editedShippingAddress = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body
    )
    await editedShippingAddress.save()
    res.status(200).end()
  } catch (err) {
    res.json({ message: err })
  }
}

exports.getShippingAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const shippingAddress = user.shipping.address
    res.status(200).json(shippingAddress)
  } catch (err) {
    res.json({ message: err })
  }
}
