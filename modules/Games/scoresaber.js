const Command = require("../../Types/command.js");

const Set = require("./scoresaber/set");
const User = require("./scoresaber/user");
const Gains = require("./scoresaber/gains");

class ScoreSaber extends Command {
  constructor(cmdPass) {
    super({
      args: 2,
      ignoreMin: true,
      aliases: ["sc"],
    });

    this.db = cmdPass.db;
  }

  async run(bot, msg, args) {
    const subcommand = args[0];
    const passthrough = args[1];

    let success;
    switch (subcommand) {
      case "set":
        success = await Set(msg, passthrough, this.db);
        await super.sendBasicSuccess(msg, success);
        break;
      case "user":
        success = await User(msg, passthrough, this.db);
        await super.sendEmbed(msg, success);
        break;
      case "gains":
        success = await Gains(msg, passthrough, this.db);
        await super.sendEmbed(msg, success);
        break;
      default:
        await super.sendBasicError(msg, "Unknown or no subcommand");
    }
  }
}
module.exports = {
  command: ScoreSaber,
  help: {
    summary: "",
    args: [
      {
        name: "subcommand",
        summary:
          "'Set': Links a scoresaber account to your discord account.\n'User': Gets your user profile from scoresaber.\n'Gains': Gets the amount of pp gained/lost since the last time the command was run.",
        required: true,
      },
      {
        name: "scoresaber url",
        summary: "Scoresaber URL or ID. E.g. https://scoresaber.com/u/76561198043731121 or 76561198043731121.",
      },
    ],
    aliases: ["sc"],
  },
};
