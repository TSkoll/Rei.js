const Discord = require('discord.js');
const db = require('../utils/dbUtil.js');
const defaultPrefix = require('../data/config.json').defaultPrefix;

let cmdHandler;

class msgHandler {
    constructor(client) {
        this.client = client;

        // Initialize command handler and hoist it to global status
        cmdHandler = new (require('../cmdHandler/cmdHandler.js'))(client);
    }

    async onMessageEvent(message) {
        // Don't check bot's messages
        if (message.author.id == this.client.user.id)
            return;

        return new Promise(async (resolve, reject) => {
            if(await db.ifRowExists('prefixes', { guildid: message.guild.id })) {
                let prefix = (await db.getRow('prefixes', { guildid: message.guild.id }))[0].prefix;
                if (message.content.startsWith(prefix)) {
                    const cmdData = message.content.split(' ', 2);
                    const cmd = cmdData[0].substring(prefix.length, cmdData[0].length);

                    try {
                        await cmdHandler.run(message, cmd, cmdData[1]);
                        resolve();
                    } catch(err) {
                        await throwErr(message, err);
                        reject(err);
                    }
                }
            } else {
                if (message.content.startsWith(defaultPrefix)) {
                    const cmdData = message.content.split(' ', 2);
                    const cmd = cmdData[0].substring(defaultPrefix.length, cmdData[0].length);

                    try {
                        await cmdHandler.run(message, cmd, cmdData[1]);
                    } catch (err) {
                        await throwErr(message, err);
                        reject(err);
                    }
                }
            }
        });
    }
}
module.exports = msgHandler;

async function throwErr(message, err) {
    message.channel.send(new Discord.RichEmbed()
    .setTitle('Woops!')
    .setDescription(err)
    .setFooter('This is an error. You should not be seeing this.'));
}