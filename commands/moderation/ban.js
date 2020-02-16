async function execute (message, args) {
  if (message.member.hasPermission(['BAN_MEMBERS', true] || ['ADMINISTRATOR', true])) {
    const mUser = message.mentions.users.first()

    if (mUser) {
      const mMember = message.guild.member(mUser)

      if (mMember) {
        mMember.ban({ reason: 'Not on my watch!' }).then(() => {
          message.reply(`${mUser.tag} just couldn't keep up!`)
          console.log('Ban hammer has come down!')
        })
      } else {
        message.channel.send('That user isn\'t in the sever!')
      }
    } else {
      message.channel.send('You need to specify a user!')
    }
  } else {
    message.channel.send('You don\'t have the permissions for that!')
  }
}

module.exports = {
  name: 'ban',
  description: 'bans a tagged user',
  usage: '>ban <user>',
  execute
}
