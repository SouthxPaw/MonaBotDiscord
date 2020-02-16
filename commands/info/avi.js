const { RichEmbed } = require('discord.js')

async function execute (message, args) {
  var member = message.mentions.users.first()

  const color = message.member.displayHexColor || message.member.hoistRole.hexColor

  const aviEmbed = new RichEmbed()
    .setImage(member.avatarURL)
    .setColor(color)

  message.channel.send(aviEmbed)
}

module.exports = {
  name: 'avi',
  description: "shows the tagged user's avatar",
  usage: '>avi <user>',
  execute
}
