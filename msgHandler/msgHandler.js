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
            // Get server specific command prefix
            let prefix = await getPrefix(message.guild.id);
            if (message.content.startsWith(prefix)) {
                // Split message into command and it's arguments
                const cmdData = message.content.split(' ', 2);
                const cmd = cmdData[0].substring(prefix.length, cmdData[0].length);

                try {
                    // Find and run command
                    await cmdHandler.run(message, cmd, cmdData[1]);
                    resolve();
                } catch(err) {
                    // Command-scope error throwing.
                    await throwErr(message, err);
                    
                    // Pass error into main
                    reject(err);
                }
            }
        });
    }
}
module.exports = msgHandler;

/* Error messaging */
async function throwErr(message, err) {
    return new Promise(async resolve => {
        await message.channel.send(new Discord.RichEmbed()
        .setTitle('Woops!')
        .setDescription(err)
        .setFooter('This is an error. You should not be seeing this.'));
        resolve();
    });
}

/* Prefix checking */
async function getPrefix(id) {
    // Check if prefix exists in the cache and return it
    if (prefixCache.has(id))
        return prefixCache.get(id);
    else {
        return new Promise(async resolve => {
            // Check if server has a custom prefix
            if (await db.ifRowExists('prefixes', { guild: id })) {
                let prefix = await db.getRow('prefixes', { guild: id })[0].prefix
                // Update cache
                prefixCache.set(id, prefix);
                
                resolve(prefix);
            }
            else {
                // Update cache, saves us from a db read
                prefixCache.set(id, defaultPrefix);
                
                // Return the default prefix if server specific one doesn't exist
                resolve(defaultPrefix);
            }
        });
    }
}
