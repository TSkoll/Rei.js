const Command = require('../../Types/command.js');

class Setname extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1,

            helpText: 'Changes the name of the bot.',
            helpArgs: {
                'Name': 'The new name of the bot.'
            }
        });
    }

    async run(bot, msg, args) {
        await bot.user.setName(args);
        await super.sendBasicSuccess(msg, 'New name set!');
    }
}
module.exports = Setname;