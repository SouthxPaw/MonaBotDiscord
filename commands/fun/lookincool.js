module.exports = {
  name: 'lookincool',
  description: 'tells a user theyre lookin cool if tagged otherwise says Joker',
  usage: '>lookcool [user]',
  execute (message, args) {
    if (!args[1]) return message.channel.send('Lookin\' cool, Joker!')
    message.channel.send("Lookin' cool, " + message.mentions.members.first() + '!')
  }
}
