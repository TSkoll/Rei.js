const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const  hugs = [
    'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1461073447-335af6bf0909c799149e1596b7170475.gif',
    'https://media.tenor.com/images/42922e87b3ec288b11f59ba7f3cc6393/tenor.gif',
    'https://78.media.tumblr.com/e790af0168cd80394b7d792dde07407b/tumblr_o76qfcMiFn1sk1rjvo1_500.gif',
    'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1461068547-d8d6dc7c2c74e02717c5decac5acd1c7.gif',
    'https://media.giphy.com/media/143v0Z4767T15e/giphy.gif',
    'http://vignette2.wikia.nocookie.net/degrassi/images/d/df/ATTACK_HUG.gif',
    'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1460988091-6e86cd666a30fcc1128c585c82a20cdd.gif',
    'https://media.tenor.com/images/a89c78696eb8854c04904959e8ac5e0e/tenor.gif',
    'http://i.imgur.com/kiadUBP.gif',
    'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1461068486-646f3523d0fd8f3e6d818d96012b248e.gif',
    'https://m.popkey.co/32edb3/zE7XE.gif',
    'https://i.pinimg.com/originals/87/b5/50/87b55088247f99d5766ef6179ecdcceb.gif',
    'https://media.giphy.com/media/ba92ty7qnNcXu/giphy.gif',
    'http://gifimage.net/wp-content/uploads/2017/01/Anime-hug-GIF-Image-Download-20.gif',
    'https://media.tenor.com/images/37a4c26fe65660b79f2efb73fc7bf76b/tenor.gif',
    'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
    'https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif',
    'https://media.giphy.com/media/xZshtXrSgsRHy/source.gif',
    'http://data.whicdn.com/images/35647480/original.gif',
    'http://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-12.gif',
    'https://38.media.tumblr.com/9f6bbded87df598ea76836fbb0db8e6c/tumblr_mymyfha9TL1sm5fjzo1_500.gif',
    'https://media.tenor.com/images/79fa9e79a8ccd5be4618b13b1f1c759f/tenor.gif',
    'https://i.imgur.com/2WywS3T.gif',
    'https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif'
];

class Hug extends Command {
    constructor() {
        super();
    }

    async run(bot, msg, args) {
        const hug = hugs[Math.floor(Math.random() * hugs.length)];
        const user = msg.mentions.members.first();

        if (user) {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#FF69B4')
            .setDescription(`**${msg.author.username}#${msg.author.discriminator}** has hugged **${user.user.username}#${user.user.discriminator}**`)
            .setImage(hug));
        } else {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#FF69B4')
            .setImage(hug));
        }
    }
}
module.exports = Hug;