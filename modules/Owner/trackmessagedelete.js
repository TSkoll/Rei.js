const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class TrackMessageDelete extends Command {
    constructor() {
        super({
            ownerOnly: true
        });
    }

    async run(msg, args, bot) {
        const currentGuild = msg.guild.id;

        bot.on('messageDelete', message => {
            if (message.guild && message.guild.id == currentGuild) {
                super.sendEmbed(new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(message.content)
                .setFooter('Deleted message')
                .setTimestamp(Date.now()))
            }
        });
    }
}