const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

// Upload image to cloudbinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// upload image only admin access
router.post('/upload', auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        success: false,
        msg: 'No files were uploaded.'
      })
    }

    const file = req.files.file
    if (file.size > 1024*1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        success: false,
        msg: 'File size is too large.'
      })
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        success: false,
        msg: 'File format is incorrect.'
      })
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'ecommerce'}, async (err, result) => {
      if (err) {
        throw err
      }

      removeTmp(file.tempFilePath)

      return res.status(200).json({
        success: true,
        data: {
          public_id: result.public_id,
          url: result.url
        }
      })
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

// delete image only admin access
router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body
    if (!public_id) {
      return res.status(400).json({
        success: false,
        msg: 'No images found.'
      })
    }

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) {
        throw err
      }

      return res.status(200).json({
        success: true,
        msg: 'Image deleted.',
        data: result
      })
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

const removeTmp = path =>{
  fs.unlink(path, err => {
    if(err) throw err
  })
}

module.exports = router
