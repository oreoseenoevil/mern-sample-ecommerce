const User = require('../models/user')
const Payment = require('../models/payment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body
      
      const user = await User.findOne({email})
      if (user) {
        return res.status(400).json({
          success: false,
          msg: 'This email already exists.'
        })
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          msg: 'Password is at least 6 characters long.'
        })
      } else if (password.length > 25) {
        return res.status(400).json({
          success: false,
          msg: 'Password is at least not more than 25 characters long.'
        })
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new User({
        name, email, password: passwordHash
      })

      // Save to mongoDB
      await newUser.save()

      // create jsonwebtoken to authenticate
      const accesstoken = createAccessToken({ id: newUser._id })
      const refreshtoken = createRefreshToken({ id: newUser._id })

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 //7 days
      })

      return res.status(200).json({
        success: true,
        data: [
          {
            name: newUser.name,
            email: newUser.password
          }
        ],
        access_token: accesstoken,
        refresh_token: refreshtoken
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({
          success: false,
          msg: 'User does not exist.'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          msg: 'Incorrect Password.'
        })
      }

      const accesstoken = createAccessToken({ id: user._id })
      const refreshtoken = createRefreshToken({ id: user._id })

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 //7 days
      })

      return res.status(200).json({
        success: true,
        data: {
          role: user.role,
          name: user.name,
          email: user.email
        },
        access_token: accesstoken,
        refresh_token: refreshtoken
      })

    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  logout: (req, res) => {
    try {
      res.clearCookie('refreshtoken', {
        path: '/user/refresh_token'
      })

      return res.status(200).json({
        success: true,
        msg: 'Logged out.'
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  refreshToken: (req, res) => {
    try {
      const rfToken = req.cookies.refreshtoken
      if (!rfToken) {
        return res.status(400).json({
          success: false,
          msg: 'Please Login or Register'
        })
      }

      jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({
            success: false,
            msg: 'Please Login or Register'
          })
        }

        const accesstoken = createAccessToken({ id: user.id })

        return res.status(200).json({
          success: true,
          user: user,
          accesstoken: accesstoken
        })
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: 'User does not exist'
        })
      }

      return res.status(200).json({
        success: true,
        data: user
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate({_id: req.user.id}, {
        cart: req.body.cart
      })
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: 'User does not exist.'
        })
      } else {
        return res.status(200).json({
          success: true,
          data: user
        })
      }

    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payment.find({user_id: req.user.id})

      return res.status(200).json({
        success: false,
        data: history
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const createAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userController
