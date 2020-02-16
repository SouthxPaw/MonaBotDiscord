module.exports = {
  name: 'clear',
  description: 'clear messages depending on your permissions and by the number that you give the bot',
  usage: '>clear <number>',
  execute (message, args) {
    if (message.member.hasPermission(['MANAGE_MESSAGES', true] || ['ADMINSTRATOR', true])) {
      if (!args[1]) return message.channel.send('I need a number of message(s) to delete!')
      else if (isNaN(args[1])) return message.channel.send("That's not a number!")
      else if (args[1] > 100) return message.channel.send("You can't delete more than 100 messages at once!")
      else if (args[1] < 1) return message.channel.send('You have to have at least 1 message to delete!')
      message.channel.bulkDelete(args[1]).then(() => {
        message.channel.send(` ${args[1]} message(s) deleted!`).then(message => message.delete(5000)).catch(err => {
          message.channel.send("I wasn't able to delete any messages. Something went wrong")
          console.error(err)
        })
      })
    } else {
      message.channel.send('You don\'t have the permissions for that!')
    }
  }

}
