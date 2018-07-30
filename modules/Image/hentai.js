const Command = require('../../Types/command.js');

const request = require('request-promise-native');
const Discord = require('discord.js')

const apis = [
    'https://konachan.com/post.json',
    'https://yande.re/post.json'
]

class Hentai extends Command {
    constructor() {
        super({
            args: 1,
            nsfw: true
        });
    }

    async run(bot, msg, args) {
        const lewd = await getLewd(apis[Math.floor(Math.random() * apis.length)], args ? args.replace(' ', '+') : null);

        if (lewd)
            await super.sendEmbed(msg, new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(lewd.file_url));
        else
            await super.sendBasicError(msg, 'Couldn\'t find any lewds with this tag combination! This can be due to a rare taste or lewdness level being too low!');
    }
}
module.exports = Hentai;

async function getLewd(api, tags, lewdlevel = 'questionable') {
    let uri = `${api}?tags=rating:${lewdlevel}+order:random`;

    if (tags)
        uri += `+${tags}`;

    let data = await request.get(uri);
    data = JSON.parse(data);

    return data[Math.floor(Math.random() * data.length)];
}