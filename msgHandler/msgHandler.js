const Discord = require('discord.js');
const db = require('../utils/dbUtil.js');
const defaultPrefix = require('../data/config.json').defaultPrefix;
const cmdHandler = require('../cmdHandler/cmdHandler.js');
const prefixHandler = new (require('./prefixHandler.js'))();

class msgHandler {
    constructor(client, statTracker) {
        this.client = client;
        this.statTracker = statTracker;

        // Initialize command handler
        this.cmdHandler = new cmdHandler(client, statTracker);
    }

    async onMessageEvent(message) {
        // Skip bot's messages
        if (message.author.id == this.client.user.id)
            return;

        // Add 1 to messages received counter
        this.statTracker.messageAdd();

        // Get guild's command prefix
        const test = (message.guild) ? true : false;
        const prefix = (message.guild) ? await prefixHandler.get(message.guild.id) : defaultPrefix;
        if (message.content.startsWith(prefix)) {
            /*
                Split the command and arguments from eachother
            */
            const cmd = (message.content.indexOf(' ') > 0) ? message.content.substring(prefix.length, message.content.indexOf(' ') - (prefix.length - 1)) : message.content.substring(prefix.length);
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
