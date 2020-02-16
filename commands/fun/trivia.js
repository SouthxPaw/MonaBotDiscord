const { RichEmbed } = require('discord.js')
const fetch = require('node-fetch')

async function execute(message, args) {
  const response = await fetch('https://opentdb.com/api.php?amount=5&type=boolean')
  const data = await response.json()
  var length = data.results.length
  var rand = Math.floor(Math.random() * length)
  var randQuestion = data.results[rand]
  var question = randQuestion.question
  var correct = randQuestion.correct_answer

  const embed = new RichEmbed()
    .setColor(0xfc1703)
    .setTitle('Trivia')
    .setDescription(question)

  const msg = await message.channel.send(embed)
  const filter = m => m.author.id === message.author.id
  const answer = await message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time', 'maxMatches'] })
  const ans = answer.first()
  if (ans.content.toLowerCase() === correct.toLowerCase()) {
    const trueEmbed = new RichEmbed()
      .setTitle('Trivia')
      .setColor(0xfc1703)
      .setDescription('Correct!')
    msg.channel.send(trueEmbed)
  } else {
    const falseEmbed = new RichEmbed()
      .setTitle('Trivia')
      .setColor(0xfc1703)
      .setDescription('Incorrect')
    msg.channel.send(falseEmbed)
  }
}

module.exports = {
  name: 'trivia',
  description: 'gives a random true or false trivia that the user can answer',
  usage: '>trivia',
  execute
}
