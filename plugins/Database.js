const Mongoose = require('mongoose')
const chalk = require('chalk')

const ProfileModel = require('../models/profile.js')

class Database {
  constructor (options = {}) {
    this.URI = options.URI
    this.models = { profiles: ProfileModel }
    this.cache = { profiles: {} }
  }

  load (client) {
    return new Promise((resolve, reject) => {
      this.client = client
      Mongoose.Promise = global.Promise
      Mongoose.connect(this.URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch((error) => {
        return reject(error)
      })
      Mongoose.set('useFindAndModify', false)
      Mongoose.set('useCreateIndex', true)
      Mongoose.connection.on('error', (error) => console.error(chalk.red.bold(`[DB] Mongoose error: ${error}`)))
      Mongoose.connection.once('open', () => console.info(chalk.green.bold('[DB] Mongoose Connected')))
      return resolve(this)
    })
  }

  destroy () {
    return new Promise((resolve, reject) => {
      this.client = undefined
      Mongoose.disconnect().catch((error) => {
        return reject(error)
      })
      Mongoose.connection.removeAllListeners('error')
      Mongoose.connection.removeAllListeners('open')
      return resolve()
    })
  }
}

module.exports = Database
