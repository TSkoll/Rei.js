const Command = require('../../Types/command.js');

class Ping extends Command {
    constructor() {
        super();
    }

    async run(bot, msg, args) {
        const pingMsg = await msg.channel.send('Pong!');
        pingMsg.edit(`Pong! Took ${pingMsg.createdTimestamp - msg.createdTimestamp}ms. Websocket ping is ${bot.ws.ping}ms.`);
    }
}
module.exports = Ping;