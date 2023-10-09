const express = require('express')
const shopController = require('../controllers/shopController')

const router = express.Router()

router.route('/').post(shopController.createNewShop)

router
  .route('/id/:shopId')
  .get(shopController.getShopData)
  .patch(shopController.updateShopProp)

router.route('/sellerId/:sellerId').get(shopController.getShopIdBySellerId)

router.route('/name/:name').get(shopController.isUniqueLogin)

router.route('/hasAShop/:sellerId').get(shopController.sellerHasAShop)

module.exports = router
