const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class Emotevote extends Command {
    constructor(cmdPass) {
        super({
            args: 2,
            ignoreMin: true,
            ownerOnly: true,
            userPerms: ['MANAGE_GUILD', 'MANAGE_EMOJIS'],
            botPerms: ['MANAGE_EMOJIS']
        });
    }

    async run(bot, msg, args) {
        const messageId = args[0];
        const acceptThreshold = args[1];

        const message = await msg.channel.fetchMessage(messageId);

        if (message.attachments.size != 0) {
            const img = message.attachments.first();

            if (img.height) {
                // Take the first thing inside the message, this should filter cases where the
                // user pastes a link instead of uploading the image.
                const emoteName = message.content.split(' ')[0];

                const sentMsg = await super.sendEmbed(new Discord.RichEmbed()
                .setThumbnail(img.url)
                .setDescription(`New emote suggestion! :${emoteName}:\nThis emote requires a total of ${acceptTreshhold}❤️ emojis to be accepted!`));

                await sentMsg.react('❤️');
                await this.createReactionCollector(sentMsg, acceptThreshold, img, emoteName);
            } else {
                throw 'The embed attached to the message wasn\'t an embed!';
            }
        } else {
            throw 'This message doesn\'t have an image attached to it!'
        }
    }

    async createReactionCollector(msg, acceptThreshold, img, emoteName) {
        const collector = msg.createReactionCollector(reaction => reaction.emoji.name = '❤️');
        collector.on('collect', r => {
            if (collector.total >= acceptThreshold) {
                await this.createEmote(msg.guild, img, emoteName);
            }
        });
    }

    async createEmote(guild, img, emoteName) {

    }
}
module.exports = Emotevote;