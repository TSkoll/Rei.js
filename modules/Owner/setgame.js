const Command = require('../../Types/command.js');

class Setgame extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1,

            helpText: 'Sets the playing status of the bot.',
            helpArgs: {
                'Game': 'Text, which is shown on the playing status.'
            }
        });
    }

    async run(bot, msg, args) {
        await bot.user.setGame(args);
        await super.sendBasicSuccess(msg, 'Game set!');
    }
}
module.exports = Setgame;