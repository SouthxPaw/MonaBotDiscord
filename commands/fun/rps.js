
const { RichEmbed } = require('discord.js')
const promptMessage = require('../../util/promptMessage')
const choices = ['⛰️', '📰', '✂️']

module.exports = {
  name: 'rps',
  description: 'lets user play rock, paper, scissors with one of the emojis',
  usage: '>rps',
  execute: async (bot, message, args) => {
    const embed = new RichEmbed()
      .setTitle('Rock, Paper, Scissors')
      .setColor('RANDOM')
      .setFooter(message.author.username, bot.user.displayAvatarURL)
      .setDescription('Add a reaction to an emoji to play!')
      .setTimestamp()

    const msg = await message.channel.send(embed)
    const reacted = await promptMessage(msg, message.author, 30, choices)

    const botChoice = choices[Math.floor(Math.random() * choices.length)]

    const result = await getResult(reacted, botChoice)
    await msg.clearReactions()

    embed
      .setDescription('')
      .addField(result, `${reacted} vs ${botChoice}`)

    msg.edit(embed)

    function getResult (me, clientChosen) {
      if ((me === '⛰️' && clientChosen === '✂️') || (me === '📰' && clientChosen === '⛰️') || (me === '✂️' && clientChosen === '📰')) {
        return 'you win!'
      } else if (me === clientChosen) {
        return "it's a tie!"
      } else {
        return 'you lost'
      }
    }
  }
}
