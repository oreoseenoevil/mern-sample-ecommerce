const User = require('../models/user')

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await User.findOne({
      _id: req.user.id
    })
    if (user.role === 0) {
      return res.status(400).json({
        success: false,
        msg: 'Admin Priveledged.'
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = authAdmin
