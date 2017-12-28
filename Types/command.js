const Discord = require('discord.js');

class Command {
    constructor(info) {
        /* Flags */
        this.ownerOnly = (info && info.hasOwnProperty('ownerOnly'))     ? info.ownerOnly    : false;
        this.args = (info && info.hasOwnProperty('args'))               ? info.args         : 0;
        this.ignoreMin = (info && info.hasOwnProperty('ignoreMin'))     ? info.ignoreMin    : false;
        this.showOnHelp = (info && info.hasOwnProperty('showOnHelp'))   ? info.showOnHelp   : true;
        this.botPerms = (info && info.hasOwnProperty('botPerms'))       ? info.botPerms     : null;
        this.userPerms = (info && info.hasOwnProperty('userPerms'))     ? info.userPerms    : null;
        this.guildOwner = (info && info.hasOwnProperty('guildOwner'))   ? info.guildOwner   : false;
        this.cost = (info && info.hasOwnProperty('cost'))               ? info.cost         : false;
        this.disallowDM = (info && info.hasOwnProperty('disallowDM'))   ? info.disallowDM   : false;

        /* Help information */
        this.helpText = (info && info.hasOwnProperty('helpText'))       ? info.helpText     : null;
        this.helpArgs = (info && info.hasOwnProperty('helpArgs'))       ? info.helpArgs     : null;
    }

    /* Functions */
    sendBasicSuccess(message, content) {
        return new Promise(async (resolve, reject) => {
            try {
                let msg = await message.channel.send(new Discord.RichEmbed()
                .setColor('GREEN')
                .setDescription(content));

                resolve(msg);
            } catch (err) {
                reject(err);
            }
        });
    }

    sendBasicError(message, content) {
        return new Promise(async (resolve, reject) => {
            try {
                let msg = await message.channel.send(new Discord.RichEmbed()
                .setColor('RED')
                .setDescription(content));

                resolve(msg);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendEmbed(message, embed) {
        return new Promise(async (resolve, reject) => {
            try {
                let msg = await message.channel.send(embed);
                
                resolve(msg);
            } catch (err) {
                reject(err);
            }
        });
    }
}
module.exports = Command;
