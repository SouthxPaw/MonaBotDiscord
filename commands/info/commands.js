const { RichEmbed } = require('discord.js')
// const { stripIndents } = require('common-tags');

async function execute(bot, message, args) {

  if (args[1] === 'mod') {
    const modEmbed = new RichEmbed()
      .setTitle('Commands')
      .setColor(0xfc1703)
      .setDescription('Moderation')
      .addBlankField()
      .addField('Prefix', '>', false)
      .addField('ban', 'bans the tagged user, must have permissions to run', false)
      .addField('kick', 'kicks the tagged user, must have permissions to run', false)
      .addField('clear', 'clear a certain amount of messages when given a number over 1, must have permissions to run')
      .addField('giverole', 'gives a role to a user when tagged and a role is written out, must have permissions to run', false)
      .addField('removerole', 'removes a role from a user when tagged and a role is written out, must have permissions to run', false)
      .addField('mute', "mutes a tagged user and can give a reason for mute, must have permissions to run", false)
      .addBlankField()
      .setTimestamp()
      .setFooter('Monabot', 'bot.user.displayAvatarURL')
    message.channel.send(modEmbed);

  } else if (args[1] === 'info') {
    const infoEmbed = new RichEmbed()
      .setTitle('Commands')
      .setColor(0xfc1703)
      .setDescription('Info')
      .addBlankField()
      .addField('Prefix', '>', false)
      .addField('creator', 'shows who created me!', false)
      .addField('server', 'shows information about the current server you\'re in', false)
      .addField('avi', 'shows you a tagged user\'s avatar', false)
      .addField('ping', 'shows a response ping to the server the bot is hosted on', false)
      .addField('profile', 'posts your profile or a tagged user\'s profile! (for more info on profile call `>profile help`', false)
      .addField('poll', 'let\'s you start a simple poll as long as there is a question behind it', false)
      .addField('weather', 'checks the user\'s weather based on a location given', false)
      .addBlankField()
      .setTimestamp()
      .setFooter('Monabot', 'bot.user.displayAvatarURL')
    message.channel.send(infoEmbed);

  } else if (args[1] === 'fun') {
    const funEmbed = new RichEmbed()
      .setTitle('Commands')
      .setColor(0xfc1703)
      .setDescription('Fun')
      .addBlankField()
      .addField('Prefix', '>', false)
      .addField('lenny', 'posts a lenny face', false)
      .addField('lookincool', 'if you tag a user then it\'ll say you\'re lookin cool, if no one is tagged then it will just say that Joker is lookin cool', false)
      .addField('cat', 'pulls up a random picture of a cat', false)
      .addField('dog', 'pulls up a random picture of a dog', false)
      .addField('roll', 'throws a dice roll! (ie: `>roll 2d6`)', false)
      .addField('coin', 'performs a coin flip', false)
      .addField('rps', 'let\'s you play a game of Rock, Paper, Scissors with the bot', false)
      .addField('trivia', 'gives random trivia and then the user can answer with true or false', false)
      .addField('victory', 'posts the triumph theme from Persona 5', false)
      .addField('urban', 'user can search a definition or the bot can pull up a random one depending on what the user inputs', false)
      .addBlankField()
      .setTimestamp()
      .setFooter('Monabot', 'bot.user.displayAvatarURL')
    message.channel.send(funEmbed);
  } else {

    const helpEmbed = new RichEmbed()
      .setTitle('Commands')
      .setColor(0xfc1703)
      .setDescription('how this command works!')
      .addField('Prefix', '>', false)
      .addField('mod', 'call `>commands mod` to see a list of mod commands', false)
      .addField('info', 'call `>commands info` to see a list of info commands', false)
      .addField('fun', 'call `>commands fun` to see a list of fun commands', false)
      .setFooter('Monabot', 'bot.user.displayAvatarURL')
      .setTimestamp()
    message.channel.send(helpEmbed);
  }

}

module.exports = {
  name: 'commands',
  description: 'sends a DM to the user with a list commands',
  usage: '>commands [command name]',
  execute
}

