const Discord = require('discord.js');
const db = require('../utils/dbUtil.js');
const defaultPrefix = require('../data/config.json').defaultPrefix;
const cmdHandler = require('../cmdHandler/cmdHandler.js');

class msgHandler {
    constructor(client, statTracker, cmdPass) {
        this.client = client;
        this.statTracker = cmdPass.statTracker;
        this.prefixHandler = cmdPass.prefixHandler;

        // Initialize command handler
        this.cmdHandler = new cmdHandler(client, cmdPass);
    }

    async onMessageEvent(message) {
        // Skip bot's messages
        if (message.author.id == this.client.user.id)
            return;

        // Add 1 to messages received counter
        this.statTracker.messageAdd();

        // Get guild's command prefix
        const prefix = (message.guild) ? await this.prefixHandler.get(message.guild.id) : defaultPrefix;

        if (message.content.startsWith(prefix)) {
            // Split the command and arguments from each other testprefix set !
            const cmd = (message.content.indexOf(' ') > 0) ? message.content.substring(prefix.length, message.content.indexOf(' ')) : message.content.substring(prefix.length);
            const argString = (message.content.indexOf(' ') > 0) ? message.content.substring(message.content.indexOf(' ') + 1) : null;

            try {
                await this.cmdHandler.run(message, cmd, argString);
            } catch (err) {
                await throwErr(message, err);
                throw err;
            }
        }
    }
}
module.exports = msgHandler;

/* Error messaging */
async function throwErr(message, err) {
    return new Promise(async resolve => {
        await message.channel.send(new Discord.RichEmbed()
        .setColor('YELLOW')
        .setTitle('Woops!')
        .setDescription(err)
        .setFooter('This is an error. You should not be seeing this.'));
        resolve();
    });
}
