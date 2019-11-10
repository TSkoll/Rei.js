const Command = require('../../Types/command.js');

const request = require('request-promise-native');
const Discord = require('discord.js')

const apis = [
    'https://konachan.com/post.json',
    'https://yande.re/post.json'
]

// TODO: Implement MongoDB Integration
class Hentai extends Command {
    constructor() {
        super({
            args: 1,
            nsfw: true
        });
    }

    async run(bot, msg, args) {
        throw "I'll be off hentai duty for the duration of No Nut November, sorry :c";

        // If there's only one tag, check local database on what boorus have the specified tag
        if (args && !args.includes(' ')) {
            let rows = await db.getRows('hentaitags', { "tagname": args })

            if (rows.length > 0) {
                const ind = Math.floor(Math.random() * rows.length);
                const row = rows[ind];

                let lewd = await getLewd(apis[row.serviceid], args, null);

                if (!lewd) {
                    // Api had a tag which had empty content, make sure to remove that from local database and try other services
                    // for backup
                    await db.deleteRows('hentaitags', { id: row.id })
                    console.log('Removed empty content tag ' + row.tagname + ' for service ' + apis[row.serviceid]);

                    let newArr = apis.slice(0);
                    newArr.splice(row.serviceid, 1);

                    for (let i = 0; i < newArr.length; i++) {
                        let api = newArr[i];
                        
                        lewd = await getLewd(api, args)

                        if (lewd)
                            break;
                    }
                }

                await sendLewd(msg, lewd);
            } else {
                const lewd = await getLewd(apis[Math.floor(Math.random() * apis.length)], args);
                await sendLewd(msg, lewd);
            }
        } else {
            const lewd = await getLewd(apis[Math.floor(Math.random() * apis.length)]);
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
        throw 'Couldn\'t find any lewds with this tag combination! This could be due to the tag being mistyped or you having too fine of a taste!'
}

async function getLewd(api, tags) {
    let uri = `${api}?tags=rating:e+order:random`;

    if (tags)
        uri += `+${tags}`;

    let data = await request.get(uri);
    data = JSON.parse(data);

    return data[Math.floor(Math.random() * data.length)];
}