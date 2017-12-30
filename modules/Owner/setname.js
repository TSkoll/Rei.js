const Command = require('../../Types/command.js');

class Setname extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1
        });
    }

    async run(bot, msg, args) {
        await bot.user.setName(args);
        await super.sendBasicSuccess(msg, 'New name set!');
    }
}
module.exports = Setname;