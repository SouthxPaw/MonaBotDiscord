const Mongoose = require('mongoose')

const profileSchema = new Mongoose.Schema({
  discordid: { type: String },
  games: { type: Array, default: 'None' },
  steam: { type: String, default: 'None' },
  battlenet: { type: String, default: 'None' },
  xbox: { type: String, default: 'None' },
  ps4: { type: String, default: 'None' },
  nintendoswitch: { type: String, default: '0000-0000-0000' }
})

module.exports = Mongoose.model('Profiles', profileSchema)
