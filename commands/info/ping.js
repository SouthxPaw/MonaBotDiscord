async function execute (bot, message, args) {
  message.channel.send('Pong! ' + Math.round(bot.ping) + 'ms')
}

module.exports = {
  name: 'ping',
  description: 'returns a users ping',
  usage: '>ping',
  execute
}
