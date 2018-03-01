const Command = require('../../Types/command.js');

class Setgame extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1
        });
    }

    async run(bot, msg, args) {
        await bot.user.setGame(args);
        await super.sendBasicSuccess(msg, 'Game set!');
    }
}
module.exports = Setgame;