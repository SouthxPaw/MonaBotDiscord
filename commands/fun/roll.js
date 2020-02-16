const { RichEmbed } = require('discord.js')

async function execute (message, args) {
  if (!args[1]) {
    message.channel.send('I need some variables! ie: 2d6')
  } else {
    const words = message.content.split(' ')
    const rollFlavor = words.slice(2).join(' ')
    if (words === args[0]) {
      if (words.length === 1) {
        return message.channel.send((Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor)
      }
    }

    let sides = words[1]
    let rolls = 1

    if (!isNaN(words[1][0] / 1) && words[1].includes('d')) {
      rolls = words[1].split('d')[0] / 1
      sides = words[1].split('d')[1]
    } else if (words[1][0] === 'd') {
      sides = sides.slice(1)
    }
    sides = sides / 1
    if (isNaN(sides) || isNaN(rolls)) {
      return
    }
    if (rolls > 1) {
      const results = []
      for (let i = 0; i < rolls; i++) {
        results.push(Math.floor(Math.random() * sides) + 1)
      }
      const sum = results.reduce((a, b) => a + b)
      const diceEmbed1 = new RichEmbed()
        .setColor(0xfc1703)
        .setTitle('🎲 Dice roll! 🎲')
        .setDescription('Your dice roll was:')
        .addField(`d${sides}`, `${results.toString()} ${rollFlavor}`, false)
        .addField('result', sum, false)
      return message.channel.send(diceEmbed1)
    } else {
      const diceEmbed2 = new RichEmbed()
        .setColor(0xfc1703)
        .setTitle('🎲 Dice roll! 🎲')
        .setDescription('Your dice roll was:')
        .addField('result', Math.floor(Math.random() * sides + 1) + ' ' + rollFlavor, true)
      return message.channel.send(diceEmbed2)
    }
  }
}

module.exports = {
  name: 'roll',
  description: 'rolls a dice',
  usage: 'roll <num><d><num>',
  execute
}
