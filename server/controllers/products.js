const Product = require('../models/product')

// Filter, sorting and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filtering () {
    const queryObj = { ...this.queryString }

    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete(queryObj[el]))

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    this.query.find(JSON.parse(queryStr))

    return this
  }

  sorting () {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this
  }

  paginating () {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const productsController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering().sorting().paginating()

      const products = await features.query

      return res.status(200).json({
        success: true,
        result: products.length,
        data: products
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  createProduct: async (req, res) => {
    try {
      const {product_id, title, price, description, content, images, category} = req.body
      if (!images) {
        return res.status(400).json({
          success: false,
          msg: 'No uploaded image.'
        })
      }

      const product = await Product.findOne({product_id})
      if (product) {
        return res.status(400).json({
          success: false,
          msg: 'This product already exists.'
        })
      }

      const newProduct = new Product({
        product_id, title: title.toLowerCase(), price, description, content, images, category
      })

      await newProduct.save()

      return res.status(200).json({
        success: true,
        data: newProduct
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      if (!product) {
        return res.status(400).json({
          success: false,
          msg: 'Product not found.'
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
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body
      if (!images) {
        return res.status(400).json({
          success: false,
          msg: 'No uploaded image.'
        })
      }

      const product = await Product.findByIdAndUpdate(req.params.id, {
        title: title.toLowerCase(), price, description, content, images, category
      })

      if (!product) {
        return res.status(400).json({
          success: false,
          msg: 'Product not found.'
        })
      } else {
        return res.status(200).json({
          success: true,
          data: product
        })
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

module.exports = productsController
