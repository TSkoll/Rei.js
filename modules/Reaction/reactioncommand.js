const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class ReactionCommand extends Command {
    constructor(imageUrls, info) {
        super(info);

        this.imgUrls = imageUrls;
    }

    async sendReaction(msg, reactMessage, query) {
        const reaction = this.imgUrls[Math.floor(Math.random() * this.imgUrls.length)];
        const mentionedUser = super.searchUser(msg, query);
        
        if (mentionedUser && reactMessage)
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(reactMessage.replace('%target%', mentionedUser.user.username)) 
            .setImage(reaction));
        else
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(reaction));
    }
}
module.exports = ReactionCommand;