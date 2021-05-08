const router = require('express').Router()
const categoriesController = require('../controllers/categories')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
  .get(categoriesController.getCategories)
  .post(auth, authAdmin, categoriesController.createCategory)

router.route('/category/:id')
  .delete(auth, authAdmin, categoriesController.deleteCategory)
  .patch(auth, authAdmin, categoriesController.updateCategory)

module.exports = router
