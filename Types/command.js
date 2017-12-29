const Discord = require('discord.js');
const ownerId = require('../data/config.json').ownerId;

/* 
    TODO

    msg/message => this.msg
*/

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

    /* Flag checks */
    checkFlags(msg) {
        // Returns true if all checks go through, otherwise false
        const ownerCheck = (this.ownerOnly)                         ? this.checkOwnerOnly(msg)  : true;
        const userPermCheck = (this.userPerms && msg.guild)         ? this.checkUserPerms(msg)  : true;
        const guildOwnerCheck = (this.guildOwner && msg.guild)      ? this.checkGuildOwner(msg) : true;
        const dmCheck = (this.disallowDM)                           ? this.isInDM(msg)          : true; 
        const botPermCheck = (this.botPerms && msg.guild)           ? this.checkBotPerms(msg)   : true;

        return ownerCheck && userPermCheck && guildOwnerCheck && dmCheck && botPermCheck;
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

    /* Permission checking */
    checkOwnerOnly(msg) {
        return msg.author.id == ownerId;
    }

    checkBotPerms(msg) {
        return msg.guild.me.permissions.has(this.botPerms);
    }

    checkUserPerms(msg) {
        return msg.member.permissions.has(this.userPerms);
    }

    checkGuildOwner(msg) {
        return msg.author.id == msg.guild.owner.id;
    }

    isInDM(msg) {
        return msg.channel.type == 'dm';
    }
}
module.exports = Command;