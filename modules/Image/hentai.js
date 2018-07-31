const Command = require('../../Types/command.js');

const request = require('request-promise-native');
const Discord = require('discord.js')
const db = require('../../utils/dbUtil')

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
        // If there's only one tag, check local database on what boorus have the specified tag
        if (args && !args.includes(' ')) {
            let rows = await db.getRows('hentaitags', { "tagname": args })

            if (rows.length > 0) {
                const lewd = await getLewd(apis[rows[Math.floor(Math.random() * rows.length)].serviceid], args, null);
                await sendLewd(msg, lewd);
            } else {
                const lewd = await getLewd(apis[Math.floor(Math.random() * apis.length)], args, null);
                await sendLewd(msg, lewd);
            }
        } else {
            const lewd = await getLewd(apis[Math.floor(Math.random() * apis.length)], null);
            await sendLewd(msg, lewd);
        }
    }
}
module.exports = Hentai;

async function sendLewd(msg, lewd) {
    if (lewd)
        return await msg.channel.send(new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(lewd.file_url));
    else
        throw 'Couldn\'t find any lewds with this tag combination! This could be due to the tag being misstyped or you having too fine of a taste!'
}

async function getLewd(api, tags, lewdlevel = 'explicit') {
    let uri = `${api}?tags=rating:${lewdlevel}+order:random`;

    if (tags)
        uri += `+${tags}`;

    let data = await request.get(uri);
    data = JSON.parse(data);

    return data[Math.floor(Math.random() * data.length)];
}