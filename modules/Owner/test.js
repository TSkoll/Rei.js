const Command = require("../../Types/command.js");

class Test extends Command {
  constructor() {
    super({
      ownerOnly: true,
      args: 1,
    });
  }

  async run(bot, msg, args) {
    const user = super.searchUser(msg, args);

    if (user) await super.sendBasicSuccess(msg, user.displayName);
    else await super.sendBasicSuccess(msg, user);
  }
}
module.exports = {
  command: Test,
};
