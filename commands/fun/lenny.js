module.exports = {
  name: 'lenny',
  description: 'sends a lenny emote',
  usage: '>lenny',
  execute (message, args) {
    message.channel.send('( ͡° ͜ʖ ͡°)')
  }
}
