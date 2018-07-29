const Command = require('../../Types/command.js');

class Hentai extends Command {
    constructor() {
        super({
            args: 1,
            nsfw: true
        });
    }

    async run(bot, msg, args) {
        super.sendBasicSuccess(msg, 'owo!');
    }
}
module.exports = Hentai;