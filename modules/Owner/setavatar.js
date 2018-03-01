const Command = require('../../Types/command.js');

class Setavatar extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1,

            helpText: 'Changes the bots avatar.',
            helpArgs: {
                'URL': 'URL to the new avatar.'
            }
        });
    }

    async run(bot, msg, args) {
        await bot.user.setAvatar(args);
        await super.sendBasicSuccess('New avatar set!');
    }
}
module.exports = Setavatar;