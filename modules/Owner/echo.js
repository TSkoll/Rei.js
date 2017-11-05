const Command = require('../../Types/command.js');

class Echo extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1
        });
    }

    run(bot, msg, args) {
        return new Promise(async (resolve, reject) => {
            try {
                await super.sendBasicSuccess(msg, msg.content);
            } catch(err) {
                reject(err);
            }
        });
    }
}
module.exports = Echo;