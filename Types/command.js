const Discord = require('discord.js');

class Command {
    constructon(info) {
        this.ownerOnly = false;

        /* Info checking */
        if (info.hasOwnPropery('ownerOnly'))
            this.ownerOnly = info.ownerOnly;
    }

    async sendBasicSuccess(msg, content) {
        return new Promise(resolve => {
            let msg = await msg.channel.send({
                embed: new Discord.RichEmbed()
                .setColor('GREEN')
                .setDescription(content)
            });
            resolve(content);
        });
    }
}
module.exports = Command;