const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');

require('dotenv-safe').config({
  allowEmptyValues: true
})
const config = {
  weather_api: process.env.WEATHER_API_KEY
}


async function execute(bot, message, args) {

  let zipCode = args[1];
  let api_key = config.weather_api
  if (!args[1]) return message.channel.send('You didn\'t give me anything to look up')
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + args[1] + "&APPID=" + api_key + "&units=metric").then(response => {
    return response.json();
  })
    .then(json => {
      {
        if (json.cod === '404') {
          message.channel.send("Not a valid city/place!")
        } else {
          const embed = new RichEmbed()
            .setTitle(`Weather for region: **${json.name}**`)
            .addField("🌡️    Current Temp", `${json.main.temp} °C`, false)
            .addField("🌤️    Forecast", `${json.weather[0].main}`, false)
            .addField("🌬️    WindSpeed", `${json.wind.speed} m\\s`, false)
            .addField("🥵    Humidity", `${json.main.humidity}`, false)
            .addField("🔺    Highest Temp", `${json.main.temp_max} °C`, false)
            .addField("🔻    Lowest Temp", `${json.main.temp_min} °C`, false)
            .setFooter(`Weather for ${json.name}`, bot.user.displayAvatarURL)
            .setTimestamp()
            .setColor(0xfc1703)
          message.channel.send(embed);

        }
      }
    }).catch(err => {
      if (err) {
        message.channel.send("Something went wrong!")
        console.log(err)
      }
    })
}



module.exports = {
  name: 'weather',
  description: 'checks the user\'s weather based on a location given',
  usage: '>weather <city>',
  execute
}