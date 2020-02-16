// Requirements for Discord Bot
const chalk = require('chalk')
const Discord = require('discord.js')
const bot = new Discord.Client()
require('dotenv-safe').config({
  allowEmptyValues: true
})
const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  db_uri: process.env.DB_URI,
}
// const fetch = require('node-fetch')

const start = Date.now()
const pkg = require('./package.json')

// Imports for obtaining images and accessing them from the internet
const cheerio = require('cheerio')
const request = require('request')

// we should be using a logger, that also saves to a logfile. i.e. winston; I'll set this up in the next few days

// File handling
const fs = require('fs')

// setting up database
const Database = require('./plugins/Database.js')
const db = new Database({
  URI: config.db_uri
})

// pulling the bot commands from a separate folder
bot.commands = new Discord.Collection()

// pulling categories, going to work on this later so we can make the embed sent to the user with the commands a little more organized than they are right now
bot.categories = fs.readdirSync('./commands/')

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  bot.commands.set(command.name, command)
}

const funFiles = fs.readdirSync('./commands/fun').filter(file => file.endsWith('.js'))
for (const file of funFiles) {
  const command = require(`./commands/fun/${file}`)

  bot.commands.set(command.name, command)
}
const infoFiles = fs.readdirSync('./commands/info/').filter(file => file.endsWith('.js'))
for (const file of infoFiles) {
  const command = require(`./commands/info/${file}`)

  bot.commands.set(command.name, command)
}
const modFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'))
for (const file of modFiles) {
  const command = require(`./commands/moderation/${file}`)

  bot.commands.set(command.name, command)
}

// how the bot logs on
bot.login(config.token)

console.log(chalk.yellow('%s booted in %dms'), pkg.name, Date.now() - start) // show how long initial startup took

// tells the console that the bot is running and sets a status for the bot
bot.on('ready', () => {
  console.log(chalk.red.bold(bot.user.username))
  console.log(`Guilds: ${chalk.cyan.bold(bot.guilds.size)} | Users: ${chalk.cyan.bold(bot.users.size)}`)

  try {
    db.load(bot)
  } catch (err) {
    console.error(chalk.red.bold(`[Mongoose]: ${err}`))
  }

  console.log(`${bot.user.username} is ready for an all out attack!`)

  /* Status types for Discord Bots
   * 0 = Playing
   * 1 = Streaming
   * 2 = Listening to
   * 3 = Watching
   */
  const statuses = [
    { type: 0, name: 'Mementos' },
    { type: 0, name: 'Take Your Heart' },
    { type: 3, name: 'the Phantom Thieves' },
    { type: 2, name: 'Life Will Change' },
    { type: 2, name: 'Wake up, Get up, Get out there' },
    { type: 0, name: '>commands for help!' }
    // ,{ type: 1, name: 'on Twitch', url: 'https://twitch.tv/twitchname'}
  ]

  bot.changeStatus = () => {
    const chooseStatus = statuses[~~(Math.random() * statuses.length)]
    bot.user.setPresence({
      game: { name: chooseStatus.name, type: chooseStatus.type || 0, url: chooseStatus.url || undefined },
      status: 'online'
    })
      .then(console.log(chalk.yellow.bold(`${bot.user.username}'s status changed to: ${chooseStatus.name}`)))
      .catch(console.error)
  }
  bot.changeStatus()
  setInterval(() => bot.changeStatus(), 5 * 60000)
})


// triggers commands with prefix
bot.on('message', message => {
  if (!message.content.startsWith(config.prefix)) return // Don't do stuff when it's not a command

  const args = message.content.substring(config.prefix.length).split(' ')

  switch (args[0]) {
    case 'lookincool':
      bot.commands.get('lookincool').execute(message, args)
      break

    case 'lenny':
      bot.commands.get('lenny').execute(message, args)
      break

    case 'creator':
      bot.commands.get('creator').execute(message, args)
      break

    case 'clear':
      bot.commands.get('clear').execute(message, args)
      break

    case 'profile':
      bot.commands.get('profile').execute(message, args, db, bot)
      break

    case 'cat':
      cat(message)
      break

    case 'dog':
      dog(message)
      break

    case 'kick':
      bot.commands.get('kick').execute(message, args)
      break

    case 'ban':
      bot.commands.get('ban').execute(message, args)
      break

    case 'commands':
      bot.commands.get('commands').execute(bot, message, args)
      break

    case 'roll':
      bot.commands.get('roll').execute(message, args)
      break

    case 'server':
      bot.commands.get('server').execute(message, args)
      break

    case 'avi':
      bot.commands.get('avi').execute(message, args)
      break

    case 'coin':
      bot.commands.get('coin').execute(message, args)
      break

    case 'rps':
      bot.commands.get('rps').execute(bot, message, args)
      break

    case 'poll':
      bot.commands.get('poll').execute(message, args)
      break

    case 'victory':
      message.channel.send('https://www.youtube.com/watch?v=9Hlharh9ANI')
      break

    case 'ping':
      bot.commands.get('ping').execute(bot, message, args)
      break

    case 'trivia':
      bot.commands.get('trivia').execute(message, args)
      break

    case 'giverole':
      bot.commands.get('giverole').execute(message, args)
      break

    case 'removerole':
      bot.commands.get('removerole').execute(message, args)
      break

    case 'weather':
      bot.commands.get('weather').execute(bot, message, args)
      break

    case 'urban':
      bot.commands.get('urban').execute(bot, message, args)
      break

    /*case 'mute':
      bot.commands.get('mute').execute(message, args)
      break*/


  }

  // TODO react to non-commands that start with prefix;  if (message.content.startsWith(config.prefix) && ) message.react("❓");
})

// function to pull a random cat image
function cat(message) {
  var options = {
    url: 'http://results.dogpile.com/serp?qc=images&q=' + 'cat',
    method: 'GET',
    headers: {
      Accept: 'text/html',
      'User-Agent': 'Chrome'
    }
  }

  request(options, function (error, response, responseBody) {
    if (error) {
      return
    }

    var cheerioLoader = cheerio.load(responseBody)

    var links = cheerioLoader('.image a.link')

    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'))

    console.log(urls)

    if (!urls.length) {
      return
    }

    // Send result
    message.channel.send(urls[Math.floor(Math.random() * urls.length)])
  })
}

// function to pull a random dog image
function dog(message) {
  var options = {
    url: 'http://results.dogpile.com/serp?qc=images&q=' + 'dog',
    method: 'GET',
    headers: {
      Accept: 'text/html',
      'User-Agent': 'Chrome'
    }
  }

  request(options, function (error, response, responseBody) {
    if (error) {
      return
    }

    var cheerioLoader = cheerio.load(responseBody)

    var links = cheerioLoader('.image a.link')

    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'))

    console.log(urls)

    if (!urls.length) {
      return
    }

    // Send result
    message.channel.send(urls[Math.floor(Math.random() * urls.length)])
  })
}

process.once('SIGINT', () => {
  console.error('Recieved SIGINT')
  if (bot) {
    try {
      bot.destroy()
      db.destroy()
    } catch (error) {
      console.error(error)
    }
  }
  process.exit(0)
})
process.on('uncaughtException', (err, origin) => {
  console.error('Caught Exception: ', err.stack, 'Exception origin: ', origin)
  process.exit(1)
})
process.on('unhandledRejection', (reason, promise) => reason && console.error('Unhandled Rejection: ', promise, 'reason: ', reason.message))
