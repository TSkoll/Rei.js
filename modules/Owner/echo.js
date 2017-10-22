const Command = require('../../Types/command.js');

class Echo extends Command {
    constructor() {
        super({
            "ownerOnly": true
        });
    }

    run(bot, msg, args) {
        return new Promise(async resolve => {
            await super.sendBasicSuccess(msg, msg.content);
        });
    }
}
module.exports = Echo;