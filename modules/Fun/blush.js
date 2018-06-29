const Command = require('../../Types/command.js');
const Discord = require('discord.js');

const blushes = [
    'https://i.imgur.com/h5HYmF1.gif',
    'https://i.imgur.com/KYSU36T.gif',
    'https://i.imgur.com/VBB58vy.gif',
    'https://i.imgur.com/z4Zk14l.gif',
    'https://i.imgur.com/Qmph0hF.gif',
    'https://i.imgur.com/Jkaov43.gif',
    'https://i.imgur.com/N8a6FPV.gif',
    'https://i.imgur.com/sjEvpjj.gif',
    'https://i.imgur.com/l5vAhAB.gif',
    'https://i.imgur.com/6m8PjPO.gif',
    'https://i.imgur.com/D4eJSPe.gif',
    'https://i.imgur.com/nxkvJHn.gif',
    'https://i.imgur.com/2q4Tn3c.gif',
    'https://i.imgur.com/5O13q3m.gif',
    'https://i.imgur.com/m9Kpy8z.gif',
    'https://i.imgur.com/EwRthAa.gif',
    'https://i.imgur.com/zNFIeBF.gif',
    'https://i.imgur.com/OGjuBBR.gif',
    'https://i.imgur.com/Zww1n0X.gif',
    'https://i.imgur.com/k52seSs.gif',
    'https://i.imgur.com/3pXSb0M.gif'
]

class Blush extends Command {
    constructor() {
        super();
     }

    async run(bot, msg, args) {
        const blush = blushes[Math.floor(Math.random() * blushes.length)];
        const member = msg.mentions.members.first();

        if (member) {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#F9CCCA')
            .setDescription(`Awwwww, you shouldn't have **${member.user.username}#${member.user.discriminator}**!`)
            .setImage(blush));
        } else {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#F9CCCA')
            .setImage(blush));
        }
    }
}
module.exports = Blush;