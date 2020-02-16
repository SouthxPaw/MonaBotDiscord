module.exports = {
  name: 'creator',
  description: 'Tells user who created the bot',
  usage: '>creator',
  execute (message, args) {
    message.channel.send('I was created by Southpaw#7777 and Universal Studio™#0001!')
  }
}
