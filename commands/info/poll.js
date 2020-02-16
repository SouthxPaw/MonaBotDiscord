const { RichEmbed } = require('discord.js')

async function execute (message, args) {
  if (message.member.hasPermission(['MANAGE_MESSAGES', true] || ['ADMINISTRATOR', true])) {
    const embed = new RichEmbed()
      .setColor(0xfc1703)
      .setTitle('Poll')
      .setDescription('>poll with a question to start the command')

    if (!args[1]) {
      message.channel.send(embed)
    }

    const msgArgs = args.slice(1).join(' ')
    message.channel.send('**' + msgArgs + '**').then(messageReaction => {
      messageReaction.react('🟢')
      messageReaction.react('🔴')
      message.delete(5000).catch(console.error)
    })
  }
}

module.exports = {
  name: 'poll',
  description: 'creates a poll for the users',
  usage: '>poll <text>',
  execute
}
