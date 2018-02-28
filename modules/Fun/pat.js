const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const Pats = [
    'https://media.giphy.com/media/ARSp9T7wwxNcs/giphy.gif',
    'https://m.popkey.co/a5cfaf/1x6lW.gif',
    'https://media.tenor.com/images/fb3e0b0f18188450bfded4a585de2b90/tenor.gif',
    'https://78.media.tumblr.com/5f971a365d815655803dcaea590df074/tumblr_od76a3qX4i1s9gdrpo1_500.gif',
    'http://gifimage.net/wp-content/uploads/2017/07/head-pat-gif-18.gif',
    'https://funnypictures1.fjcdn.com/funny_gifs/Head_e12a8e_6102763.gif',
    'http://pa1.narvii.com/6260/3fc8451fb1cba6fc5b0483b144d2507229a80305_hq.gif',
    'https://media.tenor.com/images/f38c464fb0bed57f8dba87671e4f7c34/tenor.gif',
    'http://i.imgur.com/eOJlnwP.gif',
    'https://78.media.tumblr.com/1a974f3f91a3a0284bc8c6fe033ec71d/tumblr_ox3gnsuDGZ1wqr555o1_500.gif',
    'http://i.imgur.com/LRDanyb.gif',
    'https://78.media.tumblr.com/3b72bb8d292b80c37f8a6d64d2ff0cca/tumblr_o9ha9ez6pv1v7p6apo2_400.gif',
    'http://i.imgur.com/eUKM3Ay.gif',
    'https://media.giphy.com/media/4HP0ddZnNVvKU/giphy.gif',
    'https://gifimage.net/wp-content/uploads/2017/07/head-pat-gif-16.gif',
    'http://i.imgur.com/laEy6LU.gif',
    'https://i.imgur.com/fp9XJZO.gif',
    'https://38.media.tumblr.com/ec7472fef28b2cdf394dc85132c22ed8/tumblr_mx1asbwrBv1qbvovho1_500.gif',
    'https://vignette.wikia.nocookie.net/acchikocchi/images/3/34/Headpat.gif',
    'http://31.media.tumblr.com/eeabfb1162d1976b9f4f6927f5e9639f/tumblr_mkt8lsn4En1rbyttso1_500.gif',
    'https://media.tenor.com/images/2b2f9c5d046ea2cdaca41dfdc4356eea/tenor.gif'
];


class Pat extends Command {
    constructor() {
        super({
            helpText: 'Sends a pat into the channel. Mention someone to direct it at them.'
        });
    }

    async run(bot, msg, args) {
        const pat = Pats[Math.floor(Math.random() * Pats.length)];
        const user = msg.mentions.members.first();

        if (user) {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#FF69B4')
            .setDescription(`**${msg.author.username}#${msg.author.discriminator}** has patted **${user.user.username}#${user.user.discriminator}**`)
            .setImage(pat));
        } else {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#FF69B4')
            .setImage(pat));
        }
    }
}
module.exports = Pat;