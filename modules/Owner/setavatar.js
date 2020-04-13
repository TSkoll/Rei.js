const Command = require('../../Types/command.js');

class Setavatar extends Command {
    constructor() {
        super({
            ownerOnly: true,
            args: 1
        });
    }

    async run(bot, msg, args) {
        await bot.user.setAvatar(args);
        await super.sendBasicSuccess(msg, 'New avatar set!');
    }
}
module.exports = {
    command: Setavatar
};