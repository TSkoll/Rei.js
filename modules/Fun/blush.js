const Command = require('../../Types/command.js');
const Discord = require('discord.js');

const blushes = [
    'https://media.tenor.com/images/eed1af62678b92d5da4a6d25e426ddf0/tenor.gif',
    'https://thumbs.gfycat.com/FlimsyDeafeningGrassspider-size_restricted.gif',
    'https://78.media.tumblr.com/1f144e66841bd6d980e257311d4eab29/tumblr_o00zfpBxmw1uhpv9wo1_500.gif',
    'https://78.media.tumblr.com/c2e174dce5b16f24109a450c5781838a/tumblr_ni8yoi6qLO1u55xnmo3_500.gif',
    'https://orig00.deviantart.net/d721/f/2016/125/2/e/k_on__mio_blush___gif_animation_by_kyoflameashhylden-da1elnc.gif',
    'http://i0.kym-cdn.com/photos/images/original/000/543/393/a1c.gif',
    'https://metrouk2.files.wordpress.com/2016/04/cute-blush.gif',
    'https://orig00.deviantart.net/e3f8/f/2013/145/1/9/anime_girl_blush_by_ashleyanimeelover-d66jpgq.gif',
    'https://media.tenor.com/images/d8432cf1b8c90e2b791c4cc206062596/tenor.gif',
    'https://m.popkey.co/3307ed/MlE7k.gif',
    'https://media.giphy.com/media/s5GDgGSuEgVuo/source.gif',
    'https://thumbs.gfycat.com/TallSingleArrowworm-max-1mb.gif',
    'https://m.popkey.co/077725/7jGga.gif',
    'https://media.giphy.com/media/1gbQIeNzZxcSk/giphy.gif',
    'https://i.imgur.com/nxkvJHn.gif' // <--- Thanks Silas for this!
];

class Blush extends Command {
    constructor() {
        super();
     }

    async run(bot, msg, args) {
        const blush = blushes[Math.floor(Math.random() * blushes.length)];
        const user = msg.mentions.members.first();

        if (user) {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#F9CCCA')
            .setDescription(`Awwwww, you shouldn't have **${user.user.username}#${user.user.discriminator}**!`)
            .setImage(blush));
        } else {
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('#F9CCCA')
            .setImage(blush));
        }
    }
}
module.exports = Blush;