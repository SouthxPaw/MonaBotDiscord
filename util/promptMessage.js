async function promptMessage (message, author, time, validReactions) {
  // time in as seconds, being transferred as ms
  time *= 1000

  // every emoji in the function parameters, react in good order
  for (const reaction of validReactions) await message.react(reaction)

  // only allow reactions from author and emoji must be in array provided
  const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id

  // await reactions
  return message
    .awaitReactions(filter, { max: 1, time: time })
    .then(collected => collected.first() && collected.first().emoji.name)
}

module.exports = promptMessage
