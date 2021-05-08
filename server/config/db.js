const mongoose = require('mongoose')
const keys = require('./keys')
const chalk = require('chalk')

const { database } = keys

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(database.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.log(`${chalk.green('OK')} ${chalk.blue('MongoDB Connected')} ${connect.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

module.exports = connectDB
