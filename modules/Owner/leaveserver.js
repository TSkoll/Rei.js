const Command = require("../../Types/command.js");

class Leaveserver extends Command {
  constructor() {
    super({
      ownerOnly: true,
      args: 1,
      ignoreMin: true,
    });
  }

  async run(bot, msg, args) {
    if (args.length == 0) {
      await msg.guild.leave();
    } else {
      const guild = await bot.user.guild.find("id", args);

      await guild.leave();
      await super.sendBasicSuccess("Left server!");
    }
  }
}
module.exports = {
  command: Leaveserver,
};
