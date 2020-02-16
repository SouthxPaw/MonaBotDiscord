//Keep getting TypeError: Cannot read property of 'hasPermission' of undefined
//Not entirely sure why
//But it's on line 10


const ms = require('ms');

async function execute(bot, message, args) {

  if (!message.member.hasPermission(['MANAGE_MEMBER', true] || ['ADMINSTRATOR', true])) return message.reply("You don't have the permissions for that!")

  let mutedMemberMember = message.guild.member(message.mentions.user.first() || message.guild.members.get(args[1]));

  if (!mutedMember) return message.channel.send("I couldn't find that user!");
  if (mutedMember.hasPermission(["MANAGE_SERVER", true], ["ADMINSTRATOR", true])) return message.channel.send("Sorry, I can't do that to them")

  let muteRole = message.guild.roles.find(`name`, "mutedMember");

  //start of create role
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#00008b",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          SEND_TTS_MESSAGES: false,
          ADD_REACTIONS: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    } catch (e) {
      console.log(e.stack)
    }
  }


  //start of timer
  let mutetime = args[2];
  if (!mutetime) return message.channel.send("For how long?");

  await (mutedMember.addRole(muterole.id));
  message.channel.send(`${mutedMember.displayName} has been mutedMember for ${ms(ms(mutetime))}`);

  setTimeout(function () {
    mutedMember.removeRole(muterole.id)
    message.channel.send(`${mutedMember.displayName} can speak again`)
  }, ms(mutetime));

}

module.exports = {
  name: "mute",
  description: "mute a member for a certain amount of time",
  usage: ">mute <user> <time>",
  execute
}

