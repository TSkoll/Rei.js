const Command = require("../../Types/command.js");

class Activity extends Command {
  constructor() {
    super({
      ownerOnly: true,
      args: 2,
    });
  }

  async run(bot, msg, args) {
    await bot.user.setActivity(args[1], { type: args[0] });

    await super.sendBasicSuccess(msg, "Activity set!");
  }
}
module.exports = {
  command: Activity,
};
