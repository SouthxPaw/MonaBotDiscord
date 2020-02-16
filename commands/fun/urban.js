const urban = require('urban');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');


async function execute(bot, message, args) {

  if (!args[1] || !args[1] === "random" || !args[1] === "search") return message.channel.send("The command needs something! `>urban <search|random> [text]`")
  let search = args[2] ? urban(args.slice(1).join("")) : urban.random()

  try {
    search.first(res => {
      if (!res) return message.channel.send("Nothing showed up!")
      let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res

      let embed = new RichEmbed()
        .setColor(0xfc1703)
        .setAuthor(`Urban Dictionary | ${word}`)
        .setThumbnail(bot.user.displayavatarURL)
        .setDescription(stripIndents`
        
        **Definition:** ${definition || "No definition"}

        **Example:** ${example || "no example"}

        **Upvote:** ${thumbs_up || 0}

        **Downvote:** ${thumbs_down || 0}

        **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
        .setTimestamp()
        .setFooter(`Written by ${author || "unknown"}`)

      message.channel.send(embed);
    })
  } catch (e) {
    console.log(e)
    message.channel.send("I ran into an error!")
  }
}

module.exports = {
  name: 'urban',
  description: 'pulls up an urban dictionary result',
  usage: '>urban <search|random> [text]',
  execute
}