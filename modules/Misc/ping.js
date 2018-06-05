const Command = require('../../Types/command.js');

class Ping extends Command {
    constructor() {
        super();
    }

    async run(bot, msg, args) {
        const pingMsg = await msg.channel.send('Pong!');
        pingMsg.edit(`Pong! Took ${pingMsg.createdTimestamp - msg.createdTimestamp}ms. API ping is ${bot.ping}ms.`);
    }
}
module.exports = Ping;