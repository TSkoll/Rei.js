const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const licks = [
    'https://i.imgur.com/jgwM4Ji.gif',
    'https://i.imgur.com/USpf8qs.gif',
    'https://i.imgur.com/VNaiTVY.gif',
    'https://i.imgur.com/4SNaKkk.gif',
    'https://i.imgur.com/Oa24gkc.gif',
    'https://i.imgur.com/dMDwqrs.gif',
    'https://i.imgur.com/DJEkl3H.gif',
    'https://i.imgur.com/n0vIuuG.gif',
    'https://i.imgur.com/xt3aS.gif',
    'https://i.imgur.com/5tTmSv3.gif',
    'https://i.imgur.com/qUYHuO7.gif',
    'https://i.imgur.com/8HLMJk2.gif'
]

class Lick extends Command {
    constructor() {
        super();
    }

    async run(bot, msg, args) {
        const lick = licks[Math.floor(Math.random() * licks.length)];
        const member = msg.mentions.members.first();

        if (member) {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#FF69B4')
            .setDescription(`**${msg.author.username}#${msg.author.discriminator}** has licked **${member.user.username}#${member.user.discriminator}**`)
            .setImage(lick));
        } else {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#FF69B4')
            .setImage(lick));
        }
    }
}
module.exports = Lick;