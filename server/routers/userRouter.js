const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router
  .route('/username/:username/password/:password')
  .get(userController.isValidLogin)

router.route('/').post(userController.createNewUser)

router
  .route('/id/:userId/shippingAddress')
  .patch(userController.updateShippingAddress)
  .get(userController.getShippingAddress)

module.exports = router
