const Discord = require('discord.js');
const db = require('../utils/dbUtil.js');
const defaultPrefix = require('../data/config.json').defaultPrefix;

let prefixCache = require('../prefixCache');

let cmdHandler;

class msgHandler {
    constructor(client) {
        this.client = client;

        // Initialize command handler
        cmdHandler = new (require('../cmdHandler/cmdHandler.js'))(client);
    }

    async onMessageEvent(message) {
        // Don't check bot's messages
        if (message.author.id == this.client.user.id)
            return;

        return new Promise(async (resolve, reject) => {
            let prefix = await getPrefix(message.guild.id);
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
        });
    }
}
module.exports = msgHandler;

async function throwErr(message, err) {
    return new Promise(async resolve => {
        await message.channel.send(new Discord.RichEmbed()
        .setTitle('Woops!')
        .setDescription(err)
        .setFooter('This is an error. You should not be seeing this.'));
        resolve();
    });
}

async function getPrefix(id) {
    if (prefixCache.has(id))
        return prefixCache.get(id);
    else {
        return new Promise(async resolve => {
            if (await db.ifRowExists('prefixes', { guild: id })) {
                let prefix = await db.getRow('prefixes', { guild: id })[0].prefix
                // Update cache
                prefixCache.set(id, prefix);

                resolve(prefix);
            }
            else {
                // Update cache, saves us from a db read
                prefixCache.set(id, defaultPrefix);
                
                resolve(defaultPrefix);
            }
        });
    }
}