const Command = require('../../Types/command.js');

class Echo extends Command {
    constructor() {
        super({
            ownerOnly: true,
            args: 1
        });
    }

    async run(bot, msg, args) {
        await super.sendBasicSuccess(msg, args);
    }
}
module.exports = {
    command: Echo
};