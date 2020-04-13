const Discord = require("discord.js");

const argParser = require("./argParser.js");
const cmdLoader = require("./cmdLoader.js");

class commandHandler {
  /**
   * Creates a new commandHandler.
   * @param {Discord.Client} client Current Discord client.
   * @param {Object} cmdPass Root data pass object.
   */
  constructor(client, cmdPass) {
    this.client = client;
    this.statTracker = cmdPass.statTracker;

    this.commands = {};

    console.log("Loading commands");
    this.loadCommands(cmdPass).then(() => {
      console.log("Commands loaded successfully, running afterInit");
      this.afterInit();
    });
  }

  /**
   * Finds and runs a command based on the given text arguments.
   * @param {Discord.Message} msg Discord message context for the command.
   * @param {String} cmdName Name of the command being run.
   * @param {String[]} args Array of arguments passed to the command.
   */
  async run(msg, cmdName, args) {
    try {
      // Get command and group arguments
      const cmd = this.getCommand(cmdName.toLowerCase());
      const parsedArgs = args ? argParser.parse(args, cmd.args, cmd.ignoreMin) : null;

      // Flag the message as a command run attempt
      msg.isCommand = true;

      if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) {
        try {
          await msg.author.send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription("It seems like I can't send messages in that channel!")
          );

          return;
        } catch (err) {
          console.error(
            `Tried to send a DM about not being able to deliver message to the specified channel but sending the DM failed! ${err}`
          );

          return;
        }
      }

      try {
        // Check if all permissions
        cmd.checkFlags(msg);

        await cmd.run(this.client, msg, parsedArgs);

        // Commands run +1
        this.statTracker.commandsAdd();
        cmd.executionSuccess(msg);

        return;
      } catch (err) {
        await cmd.sendBasicError(msg, err); // 'Not enough permissions to run this command!')

        return;
      }
    } catch (err) {
      if (err != "Command doesn't exist!") throw err;
    }
  }

  /**
   * Loads all commands and prepares them for use in the command handler.
   * @param {Object} cmdPass Root command pass object passed to the commands.
   */
  async loadCommands(cmdPass) {
    let ret = await cmdLoader.load(cmdPass);

    this.commands = ret.commands;
    this.help = ret.help;
    this.uniqueCommands = ret.uniqueCommands;
    return;
  }

  async afterInit() {
    const data = {
      help: this.help,
    };

    for (let cmdName of this.uniqueCommands) {
      let cmd = this.commands[cmdName];

      if (cmd.afterInit) {
        console.log(`Running afterInit for ${cmdName}`);
        await cmd.afterInit(data);
      }
    }
  }

  /**
   * Reloads all commands
   */
  async reloadCommands() {
    this.commands = {};

    await loadCommands();
    return;
  }

  /**
   * Gets the command based on its name.
   * @param {String} name Name of the command.
   */
  getCommand(name) {
    if (this.commands.hasOwnProperty(name)) {
      return this.commands[name];
    } else {
      throw "Command doesn't exist!";
    }
  }
}
module.exports = commandHandler;
