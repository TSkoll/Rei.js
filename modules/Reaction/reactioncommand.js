const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class ReactionCommand extends Command {
    constructor(imageUrls, info) {
        super(info);

        this.imgUrls = imageUrls;
    }

    async sendReaction(msg, reactMessage) {
        const reaction = this.imgUrls[Math.floor(Math.random() * this.imgUrls.length)];
        const mentionedUser = msg.mentions.users.first();
        
        if (mentionedUser)
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(reactMessage.replace('%target%', mentionedUser.username)) 
            .setImage(reaction));
        else
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(reaction));
    }
}
module.exports = ReactionCommand;