const { RichEmbed } = require('discord.js')

async function execute(message, args) {
  const serverAvi = message.guild.displayAvatarURL
  const serverEmbed = new RichEmbed()
    .setDescription('Server Information')
    .setColor(0xfc1703)
    .setThumbnail(serverAvi)
    .addField('Server Name', message.guild.name)
    .addField('Owner', message.guild.owner)
    .addField('Created On', message.guild.createdAt)
    .addField('Total Members', message.guild.memberCount)

  message.channel.send(serverEmbed)
}

module.exports = {
  name: 'server',
  description: 'gives information about the server',
  usage: '>server',
  execute
}
