const Command = require("../../Types/command.js");
const Discord = require("discord.js");
const defaultPrefix = require("../../data/config").defaultPrefix;

class Help extends Command {
  constructor(cmdPass) {
    super({
      args: 1,
      ignoreMin: false,
    });
  }

  async run(bot, msg, args) {
    if (args == null) {
      // Send the generic response
      if (msg.channel.type != "dm") {
        msg.author.send(generateGenericResponse(this.help, bot.user.username));
        await super.sendBasicSuccess(msg, "Sent a DM!");
      } else {
        msg.author.send(generateGenericResponse(this.helpTexts, bot.user.username));
      }

      return;
    }

    // Command specific help
    const cmd = this.help[args.toLowerCase()];

    if (!cmd) {
      super.sendBasicError(msg, "There doesn't seem to be any help text for this command!");
      return;
    }

    let embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle(cmd.name)
      .setDescription(cmd.summary)
      .setFooter(`Usage: ${buildUsage(cmd)}`);

    if (cmd.args) {
      const args = cmd.args.map(arg => `**${arg.name}** =>\n ${arg.summary}`).join("\n\n");
      embed.addField("arguments", args);
    }

    if (cmd.aliases) {
      embed.addField("aliases", cmd.aliases.join(", "));
    }

    await super.sendEmbed(msg, embed);
  }

  async afterInit(data) {
    this.help = data.help;
  }
}
module.exports = {
  command: Help,
  help: {
    summary: "Helps you use the bot. Duh.",
    args: [
      {
        name: "command",
        summary: "Command to get the help information from.",
        required: false,
      },
    ],
  },
};

function buildUsage(cmd) {
  let cmdName = cmd.name;

  if (cmd.aliases) cmdName = `[${[cmdName, ...cmd.aliases].join("|")}]`;

  let ret = defaultPrefix + cmdName;

  if (cmd.args) {
    const argsText = {};

    for (let arg of cmd.args) {
      const tier = arg.tier || 0;

      if (!argsText[tier]) argsText[tier] = [];

      argsText[tier].push(`${!arg.required ? "(" : ""}${arg.name}${!arg.required ? ")" : ""}`);
    }

    const keys = Object.keys(argsText);
    for (let i = 0; i < keys.length; i++) {
      const tierArgs = argsText[keys[i]];
      ret += ` ${tierArgs.length > 1 ? `[${tierArgs.join("|")}]` : `[${tierArgs[0]}]`}`;
    }
  }

  return ret;
}

function generateGenericResponse(help, name) {
  let ret =
    "Hi! I'm " +
    name +
    " and I'm here to help you!\n\n" +
    "Invite: <https://discordapp.com/oauth2/authorize?client_id=278819964851322880&scope=bot&permissions=2146958591>\n\n" +
    "Need help? Got ideas? Just want to hang out? Come over to The Order of Spoon!\nhttps://discord.gg/eb8V99d\n\n" +
    `Commands **Default prefix: "${defaultPrefix}"**\n\n` + 
    Object.keys(help).join("\n");

  return ret;
}

function generateCompleteHelp(helpObjects) {
  const keys = Object.keys(helpObjects);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let helpObj = helpObjects[key];

    if (helpObj.aliases) {
      for (let j = 0; j < helpObj.aliases.length; j++) {
        let alias = helpObj.aliases[j];
        helpObjects[alias] = helpObj;
      }
    }
  }

  return helpObjects;
}
