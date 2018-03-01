const Command = require('../../Types/command.js');

class Echo extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1,

            helpText: 'Echoes text to the chat.',
            helpArgs: {
                'Text': 'Text that will be echoed.'
            }
        });
    }

    async run(bot, msg, args) {
        await super.sendBasicSuccess(msg, args);
    }
}
module.exports = Echo;