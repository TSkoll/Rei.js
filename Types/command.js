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
        this.rateLimit = (info && info.hasOwnProperty('rateLimit'))     ? info.rateLimit    : 0; //IN MILLISECONDS!

        /* When command was executed and by whom? */
        this.executed = this.rateLimit > 0                              ? new Map()         : null;
    }

    /* Flag checks */
    checkFlags(msg) {
        // Throw if any check doesn't go through
        if(this.ownerOnly && !this.checkOwnerOnly(msg))
            throw 'You\'re not my master!';
        
        if( (this.userPerms && msg.guild && !this.checkUserPerms(msg)) ||
            (this.guildOwner && msg.guild && !this.checkGuildOwner(msg)) ||
            (this.botPerms && msg.guild && !this.checkBotPerms(msg)))
            throw 'Not enough permissions';
        
        if(this.disallowDM && this.isInDM(msg))
            throw 'I can\'t do that in a DM';

        if(this.rateLimit > 0 && !this.checkCooldown(msg))
            throw `Command on cooldown! Please wait for **${Math.round((this.rateLimit - (Date.now() - this.executed.get(msg.author))) / 1000)}** more second(s).`;
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

    checkCooldown(msg) {
        /*
         * If user hasn't used the command return true
         * otherwise check if the difference between current time and last execution is greater than required cooldown
         */
        return !this.executed.has(msg.author) ? true : Date.now() - this.executed.get(msg.author) > this.rateLimit;
    }

    executionSuccess(msg) {
        if(this.executed)
            this.executed.set(msg.author, Date.now());
    }
}
module.exports = Command;