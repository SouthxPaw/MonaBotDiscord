// const Discord = require('discord.js')

async function execute (message, args) {
  if (!message.member.hasPermission(['MANAGE_MEMBER', true] || ['ADMINSTRATOR', true])) return message.reply("You don't have the permissions for that!")

  const rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[1] || message.guild.members.get(args[1]))
  if (!rMember) return message.channel.send('That user doesn\'t exist in this server!')
  const role = message.guild.roles.find(r => r.name === args[2]) || message.guild.roles.find(r => r.id === args[2]) || message.mentions.roles.first()
  if (!role) return message.channel.send("Seems like that role doesn't or you didn't specify one")

  // if (!message.guild.me.hasPermission(["MANAGE_MEMBER", true] || ["ADMINSTRATOR", true])) return message.channel.send("I don't have that permission")
  if (rMember.roles.has(role.id)) {
    return message.channel.send('That user already has that role!')
  } else {
    await rMember.addRole(role.id).catch(e => console.log(e.message))
    message.channel.send(`${rMember.displayName} has been given the role, ${role.name}!`)
  }
}

module.exports = {
  name: 'giverole',
  description: 'adds a role to another user',
  usage: '>giverole <user> <role>',
  execute
}
