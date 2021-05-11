const Category = require('../models/category')
const Product = require('../models/product')

const categoriesController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      
      return res.status(200).json({
        success: true,
        data: categories
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role = 1 --> admin
      // only admin can create, delete and update category
      const { name } = req.body
      const category = await Category.findOne({name})
      if (category) {
        return res.status(400).json({
          success: false,
          msg: 'This category already exist.'
        })
      }

      const newCategory = new Category({name})

      await newCategory.save()

      return res.status(200).json({
        success: true,
        data: newCategory
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({ category: req.params.id })
      if (products) {
        return res.status(400).json({
          success: false,
          msg: 'Please delete all products related to this category.'
        })
      }
      const category = await Category.findByIdAndDelete(req.params.id)
      if (!category) {
        return res.status(404).json({
          success: false,
          msg: 'Category not found.'
        })
      }

      return res.status(200).json({
        success: true,
        data: {}
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body)

      return res.status(200).json({
        success: true,
        data: category
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

module.exports = categoriesController
