'use strict'

/**
 * Represents a command; currently untested
 */
class Command {
  /**
   * Register a command
   * @arg {String} label The command label
   * @arg {Function | String | Array<Function | String>} generator A response string, array of functions or strings, or function that generates a string or array of strings when called.
   * If a function is passed, the function will be passed a Message object and an array of command arguments. The Message object will have an additional property `prefix`, which is the prefix used in the command.
   * `generator(msg, args)`
   * @arg {Object} [options] Command options
   * @arg {Array<String>} [options.aliases] An array of command aliases
   * @arg {Boolean} [options.argsRequired=false] If arguments are required or not
   * @arg {Boolean} [options.caseInsensitive=false] Whether the command label (and aliases) is case insensitive or not
   * @arg {String} [options.group='none'] A string that represents the command's group
   * @arg {Number} [options.cooldown] The cooldown between command usage in milliseconds
   * @arg {Object} [options.cooldownExclusions={}] A set of factors that limit where cooldowns are active
   * @arg {Array<String>} [options.cooldownExclusions.userIDs] An array of user IDs representing users that are not affected by cooldowns.
   * @arg {Array<String>} [options.cooldownExclusions.guildIDs] An array of guild IDs representing guilds that are not affected by cooldowns.
   * @arg {Array<String>} [options.cooldownExclusions.channelIDs] An array of channel IDs representing channels that are not affected by cooldowns.
   * @arg {Function | String} [options.cooldownMessage] A string or a function that returns a string to show when the command is on cooldown.  The function is passed the Message object as a parameter.
   * @arg {Number} [option.cooldownReturns=0] Number of times to return a message when the command is used during it's cooldown.  Once the cooldown expires this is reset.  Set this to 0 to always return a message.
   * @arg {Boolean} [options.deleteCommand=false] Whether to delete the user command message or not
   * @arg {String} [options.description="No description"] A short description of the command to show in the default help command
   * @arg {Boolean} [options.dmOnly=false] Whether to prevent the command from being used in guilds or not
   * @arg {Function | String} [options.errorMessage] A string or a function that returns a string to show if the execution of the command handler somehow fails.  The function is passed the Message object as a parameter.
   * @arg {String} [options.fullDescription="No full description"] A detailed description of the command to show in the default help command
   * @arg {Boolean} [options.guildOnly=false] Whether to prevent the command from being used in Direct Messages or not
   * @arg {Boolean} [options.hidden=false] Whether or not the command should be hidden from the default help command list.
   * @arg {Function | String} [options.invalidUsageMessage] A string or a function that returns a string to show when a command was improperly used.  The function is passed the Message object as a parameter.
   * @arg {Function | String} [options.permissionMessage] A string or a function that returns a string to show when the user doesn't have permissions to use the command.  The function is passed the Message object as a parameter.
   * @arg {Number} [options.reactionButtonTimeout=60000] Time (in milliseconds) to wait before invalidating the command's reaction buttons
   * @arg {Object} [options.requirements] A set of factors that limit who can call the command
   * @arg {Function | Array<String>} [options.requirements.userIDs] An array or a function that returns an array of user IDs representing users that can call the command.  The function is passed the Message object as a parameter.
   * @arg {Function | Object} [options.requirements.permissions] An object or a function that returns an object containing permission keys the user must match to use the command.  The function is passed the Message object as a parameter.
   * i.e.:
   * ```
   * {
   *   "ADMINISTRATOR": false,
   *   "MANAGE_MESSAGES": true
   * }
   * ```
   * In the above example, the user must not have administrator permissions, but must have manageMessages to use the command
   * @arg {Function | Array<String>} [options.requirements.roleIDs] An array or a function that returns an array of role IDs that would allow a user to use the command.  The function is passed the Message object as a parameter.
   * @arg {Function | Array<String>} [options.requirements.roleNames] An array or a function that returns an array of role names that would allow a user to use the command.  The function is passed the Message object as a parameter.
   * @arg {Function} [options.requirements.custom] A function that accepts a message and returns true if the command should be run
   * @arg {Boolean} [option.restartCooldown=false] Whether or not to restart a command's cooldown every time it's used.
   * @arg {String} [options.usage] Details on how to call the command to show in the default help command
   */
  constructor (label, generator, options) {
    this.label = label
    this.description = options.description || 'No description'
    this.fullDescription = options.fullDescription || 'No full description'
    this.group = options.group || 'none'
    this.usage = options.usage || ''
    this.aliases = options.aliases || []
    this.caseInsensitive = !!options.caseInsensitive
    this.requirements = options.requirements || {}
    if (!this.requirements.userIDs) {
      this.requirements.userIDs = []
    }
    if (!this.requirements.permissions) {
      this.requirements.permissions = {}
    }
    this.deleteCommand = !!options.deleteCommand
    this.argsRequired = !!options.argsRequired
    this.guildOnly = !!options.guildOnly
    this.dmOnly = !!options.dmOnly
    this.cooldown = options.cooldown || 0
    this.cooldownExclusions = options.cooldownExclusions || {}
    if (!this.cooldownExclusions.userIDs) {
      this.cooldownExclusions.userIDs = []
    }
    if (!this.cooldownExclusions.guildIDs) {
      this.cooldownExclusions.guildIDs = []
    }
    if (!this.cooldownExclusions.channelIDs) {
      this.cooldownExclusions.channelIDs = []
    }
    if (this.cooldown !== 0) {
      this.usersOnCooldown = new Set()
      if (this.restartCooldown) {
        this.cooldownTimeouts = {}
      }
      if (this.cooldownReturns) {
        this.cooldownAmounts = {}
      }
    }
    if (typeof generator === 'string') {
      this.response = generator
      this.execute = () => this.response
    } else if (Array.isArray(generator)) {
      this.responses = generator.map((item, index) => {
        if (typeof item === 'string') {
          return () => item
        } else if (typeof item === 'function') {
          return item
        } else {
          throw new Error(`Invalid command response generator (index ${index})`)
        }
      })
      this.execute = () => this.responses[Math.floor(Math.random() * this.responses.length)]()
    } else if (typeof generator === 'function') {
      this.execute = generator
    } else {
      throw new Error('Invalid command response generator')
    }
    this.restartCooldown = !!options.restartCooldown
    this.cooldownReturns = options.cooldownReturns || 0
    this.cooldownMessage = options.cooldownMessage || false
    this.invalidUsageMessage = options.invalidUsageMessage || false
    this.permissionMessage = options.permissionMessage || false
    this.errorMessage = options.errorMessage || ''
    this.hidden = !!options.hidden
  }

  async permissionCheck (msg) {
    if (this.requirements.custom) {
      if (typeof this.requirements.custom !== 'function') {
        throw new Error('Custom requirement is not a function')
      }
      if (!(await this.requirements.custom(msg))) {
        return false
      }
    }
    if (this.requirements.userIDs) {
      const userIDs = typeof this.requirements.userIDs === 'function' ? await this.requirements.userIDs(msg) : this.requirements.userIDs
      if (!Array.isArray(userIDs)) {
        throw new Error('User IDs requirement is not an array')
      }
      if (userIDs.length > 0 && !userIDs.includes(msg.author.id)) {
        return false
      }
    }
    if (msg.channel.guild) {
      if (this.dmOnly) {
        return false
      }
    } else if (this.guildOnly) {
      return false
    }
    if (this.requirements.permissions) {
      const requiredPermissions = Object.entries(
        typeof this.requirements.permissions === 'function' ? await this.requirements.permissions(msg) : this.requirements.permissions
      )
      if (requiredPermissions.length > 0) {
        const permissions = msg.channel.memberPermissions(msg.author.id)
        for (const [permission, value] of requiredPermissions) {
          if (permissions.has(permission) !== !!value) {
            return false
          }
        }
      }
    }
    if (msg.member) {
      const roleIDs = msg.member.roles.map(r => r.id) || []
      if (this.requirements.roleIDs) {
        const requiredRoleIDs = typeof this.requirements.roleIDs === 'function' ? await this.requirements.roleIDs(msg) : this.requirements.roleIDs
        if (!Array.isArray(requiredRoleIDs)) {
          throw new Error('Role IDs requirement is not an array')
        }
        for (const roleID of requiredRoleIDs) {
          if (!roleIDs.includes(roleID)) {
            return false
          }
        }
      }
      if (this.requirements.roleNames) {
        // WIP: this is how it would work with Eris Client, likely not discord.js
        const roleNames = roleIDs.map(roleID => msg.channel.guild.roles.get(roleID).name)
        const requiredRoleNames = this.requirements.roleNames === 'function' ? await this.requirements.roleNames(msg) : this.requirements.roleNames
        if (!Array.isArray(roleNames)) {
          throw new Error('Role names requirement is not an array')
        }
        for (const roleName of requiredRoleNames) {
          if (!roleNames.includes(roleName)) {
            return false
          }
        }
      }
    }
    return true
  }

  cooldownExclusionCheck (msg) {
    return (
      this.cooldownExclusions.channelIDs.includes(msg.channel.id) ||
      this.cooldownExclusions.userIDs.includes(msg.author.id) ||
      (msg.channel.guild && this.cooldownExclusions.guildIDs.includes(msg.channel.guild.id))
    )
  }

  cooldownCheck (msg) {
    // Verify the msg isn't excluded from cooldown checks
    if (this.cooldownExclusionCheck(msg)) {
      return true
    }

    const userID = msg.author.id
    if (this.usersOnCooldown.has(userID)) {
      if (this.cooldownReturns) {
        this.cooldownAmounts[userID]++
      }
      if (this.restartCooldown) {
        clearTimeout(this.cooldownTimeouts[userID])
        this.cooldownTimeouts[userID] = setTimeout(() => {
          this.usersOnCooldown.delete(userID)
        }, this.cooldown)
      }
      return false
    }
    if (this.cooldownReturns) {
      this.cooldownAmounts[userID] = 0
    }
    this.usersOnCooldown.add(userID)
    if (this.restartCooldown) {
      this.cooldownTimeouts[userID] = setTimeout(() => {
        this.usersOnCooldown.delete(userID)
      }, this.cooldown)
    } else {
      setTimeout(() => {
        this.usersOnCooldown.delete(userID)
      }, this.cooldown)
    }
    return true
  }

  async process (args, msg) {
    const shouldDelete = this.deleteCommand && msg.channel.guild && msg.channel.memberPermissions(msg.client.user.id).has('MANAGE_MESSAGES')

    let reply
    if (!this.permissionCheck(msg)) {
      if (shouldDelete) {
        msg.delete()
      }
      reply = typeof this.permissionMessage === 'function' ? this.permissionMessage(msg) : this.permissionMessage
      if (reply) {
        msg.channel.send(reply)
      }
      return
    }
    if (args.length === 0) {
      if (shouldDelete) {
        msg.delete()
      }
      if (this.argsRequired) {
        reply = typeof this.invalidUsageMessage === 'function' ? this.invalidUsageMessage(msg) : this.invalidUsageMessage
        if (reply) {
          msg.channel.send(reply.replace(/%prefix%/g, msg.prefix).replace(/%label%/g, this.fullLabel))
        }
        return
      }
      if (this.cooldown !== 0 && !this.cooldownCheck(msg)) {
        if (this.cooldownMessage && (!this.cooldownReturns || this.cooldownAmounts[msg.author.id] <= this.cooldownReturns)) {
          reply = typeof this.cooldownMessage === 'function' ? this.cooldownMessage(msg) : this.cooldownMessage
          if (reply) {
            msg.channel.send(reply)
          }
        }
        return
      }
      return this.executeCommand(msg, args)
    }
  }

  async executeCommand (msg, args) {
    return this.execute(msg, args)
  }

  toString () {
    return `[Command ${this.label}]`
  }
}

module.exports = Command
