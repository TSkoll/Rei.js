const Command = require('../../Types/command.js');

class Spank extends Command {
    constructor() {
        super()

        this.spanks = 0;
    }

    async run(bot, msg, args) {
        this.spanks++;

        if (this.spanks > 10) {
            await msg.channel.send('owo');
            this.spanks = 0;
        }
    }
}
module.exports = Spank;