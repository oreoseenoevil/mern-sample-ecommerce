const router = require('express').Router()
const productsController = require('../controllers/products')

router.route('/product')
  .get(productsController.getProducts)
  .post(productsController.createProduct)

router.route('/product/:id')
  .delete(productsController.deleteProduct)
  .patch(productsController.updateProduct)

module.exports = router
