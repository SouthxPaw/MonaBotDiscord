const { RichEmbed } = require('discord.js')
const getMember = require('../../util/getMember.js')
const getUserFromMention = require('../../util/getUserFromMention')
const formatDate = require('../../util/formatDate')
/**
 * Function to execute when command is called
 * @param {Discord.Message} message Message that caused command call
 * @param {Array<String>} args Arguments (without prefix)
 * @param {Database} db Mongoose Client
 */
async function execute(message, args, db, bot) {
  const color = message.member.displayHexColor || message.member.hoistRole.hexColor

  // get subcommand
  const subcmd = args[1] || 'show'

  const member = getMember(message)
  const joined = formatDate(member.joinedAt)

  db.models.profiles.findOne({ discordid: member.user.id }, async (error, u) => {
    if (error || !u) {
      console.log('Profile not found for: ' + member.user.tag)
      if (member.user.id === message.author.id) {
        console.log('Attempting to create...')
        await db.models.profiles.create({ discordid: message.author.id }, (error, add) => {
          if (error || !add) {
            console.log('Failed to add user to db!')
          } else {
            console.log('Success!')
            message.channel.send(
              'You had no profile set up, so I created one for you!'
            )
            this.execute(message, args, db)
          }
        })
      } else { return message.channel.send('The user must create a profile first! Ask them to run this command.') }
    }

    if (u === null) return

    if (subcmd === 'help') {
      const profileEmbed = new RichEmbed()
        .setTitle('Profile commands')
        .setColor('RANDOM')
        .setDescription('For commands to properly work, you will need to use ">profile update {option}"')
        .addBlankField()
        .addField('steam', 'updates your steam name or ID', false)
        .addField('battle.net', 'updates your battletag', false)
        .addField('xbox', 'updates your gamertag', false)
        .addField('psn', 'updates your psn', false)
        .addField('switch', 'updates your switch friend code', false)
        .addBlankField()
        .setTimestamp()
        .setFooter('Monabot', 'https://i.imgur.com/jPR4wNH.jpg')

      message.author.send(profileEmbed)
    }

    if (subcmd === 'update') {
      // update fields
      if (!args[2]) return message.channel.send('Please enter a (valid) field to update. (i.e. steam)')
      if (!args[3]) return message.channel.send('Please enter a value to update.')
      switch (args[2]) { // switch for fields   // so this is working now, but it's not very clean. we should look to reduce the amount of code here.
        case 'steam':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { steam: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'battlenet':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { battlenet: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'battle.net':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { battlenet: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'xbox':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { xbox: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'psn':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { ps4: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'ps4':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { ps4: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'switch':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { nintendoswitch: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break

        case 'nintendo':
          db.models.profiles.findOneAndUpdate({ discordid: message.author.id }, { $set: { nintendoswitch: args.slice(3).join(' ') } }, (error, uu) => {
            if (error || !uu) {
              console.log('Error updating user in DB!')
              message.channel.send('I\'ve encountered an error trying to update your profile!').catch(console.error)
            } else {
              message.channel.send('Profile updated!').catch(console.error)
            }
          })
          break
      }
    } else if (subcmd === 'show' || getUserFromMention(args[1], bot).id === getMember(message).user.id) {
      db.models.profiles.findOne({ discordid: member.user.id }, (error, uu) => {
        if (error || !uu) return console.log('no profile found for: ' + member.user.tag)

        const embed = new RichEmbed()
          .setTitle('Player Info')
          .addField('Discord', member.user.tag, false)
          .addField('Nickname', member.displayName, false)
          .addField('Joined', joined, false)
          .addBlankField()
          .addField('Steam/ID', uu.steam, true)
          .addField('Battle.net', uu.battlenet, true)
          .addField('Xbox Live', uu.xbox, true)
          .addField('PSN', uu.ps4, true)
          .addField('Nintendo Switch', 'SW-' + uu.nintendoswitch, true)
          .setColor(color)
          .setThumbnail(member.user.avatarURL)
          .setTimestamp()
          .setFooter(member.user.tag, member.user.avatarURL)
          .addBlankField()
        if (member.user.presence.game) { embed.addField('Currently Playing', member.user.presence.game.name, false) }
        message.channel.send(embed)
      }).catch(console.error)
    }
  }).catch(console.error)
}

module.exports = {
  name: 'profile',
  description: 'Creates the profile for the user with options for what to input into the empty fields',
  usage: '>profile [update or help] [option] [text]',
  execute
}
