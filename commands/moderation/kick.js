
async function execute (message, args) {
  if (message.member.hasPermission(['KICK_MEMBERS', true] || ['ADMINISTRATOR', true])) {
    const mUser = message.mentions.members.first()

    if (mUser) {
      const mMember = message.guild.member(mUser)

      if (mMember) {
        mMember.kick({ reason: 'Witness my resolve!' }).then(() => {
          message.channel.send('Their bad luck running into us!')
          console.log('User has been kicked out!')
        }).catch(err => {
          message.reply('Gh... failure...')
          console.log(err)
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
  name: 'kick',
  description: 'kicks a tagged user',
  usage: '>kick <user>',
  execute
}
