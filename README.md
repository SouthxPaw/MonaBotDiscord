# MonaBot

A mutli-utility discord bot!

MonaBot is personalized after the Persona 5 sidekick, Morgana.

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## How do I get MonaBot on my Discord Server?

- You can invite MonaBot to your discord with this link: http://bit.ly/addmona

   - Please don't change any of the permissions set, it allows the bot to work properly



## Installation

To self-host the bot, you will need two things:
- [NodeJS >= 8.0.0](https://nodejs.org/en/download/)
- A MongoDB Server (you can self-host that as well, or have a look at online services like 

To install: clone the repo, `cd` into the directory and run the installer

```
git clone https://github.com/SouthxPaw/MonaBot.git
cd MonaBot
npm ci
```

Then configurate the Bot using the .env file:
- Copy the .env.example file to .env
- Fill in the variables
 - admin ids should be seperated by ', '
 - To get help with the MongoDB connection URI, click [here](https://docs.mongodb.com/manual/reference/connection-string/)

Start the Bot using `npm start`


## Features
### Monabot has a wide amount of commands and we hope to add more in future updates!
*If you would like a new feature to be added, please open an issue. To contribute please create a pull request.*

- Moderation
  - kick
  - ban
  - clear
  - giverole
  - removerole
  
- Information
  - creator
  - server
  - avi
  - ping
  - profile
  - poll
  - weather
  
- Fun
  - lenny
  - lookincool
  - cat
  - dog
  - roll
  - coin
  - rps
  - trivia
  - victory


## Team

Southpaw
- GitHub [https://www.github.com/SouthxPaw](https://www.github.com/SouthxPaw)

Universal Studio™
- Github [https://github.com/TMUniversal](https://github.com/TMUniversal)



## FAQ

- **How do I set profiles?**
    - You will need to create a profile by calling "profile" first 
    - After this it should be able to send your profile
    - You can update it with a command like this: "profile update {steam|battlenet|...} {name}"
  
- **I lost to the bot in Rock, Paper, Scissors. How can I win?**
    - You'll get it one day!

- **I'm not sure how the commands work**
    - Call "help" or "commands" to get a run through of the commands, it will give you an idea what they and how they work.


## Support

Reach out to either of us on Discord!

- Southpaw#7777
- Universal Studio™#0001

## License

Please consult the [LICENSE](LICENSE) file
