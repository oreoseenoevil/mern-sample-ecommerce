require('dotenv').config()
const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const historyApiFallback = require('connect-history-api-fallback')
const path = require('path')

const keys = require('./config/keys')
const connectDB = require('./config/db')
const webpackConfig = require('../webpack.config')

const { port } = keys
connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/user'))
app.use('/api', require('./routes/category'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/product'))
app.use('/api', require('./routes/payment'))

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig)

  app.use(
    historyApiFallback({
      verbose: false
    })
  )

  app.use(
    middleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      // contentBase: path.resolve(__dirname, '../client/public'),
      // stats: {
      //   colors: true,
      //   hash: false,
      //   timings: true,
      //   chunks: false,
      //   chunkModules: false,
      //   modules: false
      // }
    })
  )

  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.resolve(__dirname, '../dist')))
} else {
  app.use(compression())
  app.use(express.static(path.resolve(__dirname, '../dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })
}

app.listen(port, () => {
  console.log(
    `${chalk.green('OK')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  )
})
