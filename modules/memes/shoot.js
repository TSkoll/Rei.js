const Command = require('../../Types/command.js');

class Shoot extends Command {
    constructor() {
        super();
     }

    async run(bot, msg, args) {
        await msg.channel.send("No.")
    }
}
module.exports = Shoot;