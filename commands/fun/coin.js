const { RichEmbed } = require('discord.js')

async function execute (message, args) {
  const side = ['Heads', 'Tails']

  const result = side[Math.floor(Math.random() * side.length)]

  message.channel.send(
    new RichEmbed()
      .setTitle('💸 Coin Flip 💸')
      .setColor(0xfc1703)
      .setDescription('The coin has been flipped!')
      .addField('It landed on:', `${result}`, false)
  )
}

module.exports = {
  name: 'coin',
  description: 'preforms a coin flip',
  usage: '>coin',
  execute
}
