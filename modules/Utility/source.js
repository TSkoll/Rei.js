const Command = require('../../Types/command.js');
const Discord = require('discord.js');

const fileType = require('file-type');
const request = require('request-promise-native');
const FormData = require('form-data');

class Source extends Command {
    constructor(cmdPass) {
        super({
            args: 0,
            disallowDM: true,
            aliases: [ 'sauce' ],
            rateLimit: 30000 // 30s cooldown
        });

        this.saucenaoKey = cmdPass.saucenaoKey;
    }

    async run(bot, msg, args) {
        const messages = await msg.channel.fetchMessages({ limit: 10 });
        const messagesArray = messages.array();

        for (let i = 0; i < messagesArray.length; i++) {
           const message = messagesArray[i];
           
           if (message.attachments.size != 0) {
               const img = message.attachments.first();

               // Height does not exist unless attachment is an image
               if (img.height) {
                    const buf = await request.get({ url: img.url, encoding: 'binary' });
                    const rawSauce = await getSauce(Buffer.from(buf, 'binary'), this.saucenaoKey);
                    const sortedSauce = sortSauce(rawSauce);
                
                    await super.sendEmbed(msg, embedify(sortedSauce));
                    return;
                } 
            } else if (message.embeds.length > 0) {
                const e = message.embeds[0];
                const embedImageUrl = e.url || (e.image && e.image.url)

                if (embedImageUrl) {
                    const buf = await request.get({ url: embedImageUrl, encoding: 'binary' });
                    const rawSauce = await getSauce(Buffer.from(buf, 'binary'), this.saucenaoKey);
                    const sortedSauce = sortSauce(rawSauce);

                    await super.sendEmbed(msg, embedify(sortedSauce));
                    return;
                }
            }
        }

        await super.sendBasicError(msg, 'I couldn\'t find images in the last 10 messages!');
    }
}

function embedify(sortedSauce) {
    let desc = `**#1: ${textify(sortedSauce[0])}**\n\n`;

    for (let j = 1; j < sortedSauce.length; j++) {
        desc += `#${j + 1} ${textify(sortedSauce[j])}\n\n`;
    }

    let retMsg = new Discord.RichEmbed()
    .setColor('BLUE')
    .setThumbnail(sortedSauce[0].thumbnailURL)
    .setTitle(`Found ${sortedSauce.length} matches!`)
    .setDescription(desc)
    .setFooter('Powered by saucenao');

    return retMsg;
}

async function getSauce(buffer, saucenaoKey) {
    const form = new FormData();

    form.append('output_type', 2);
    form.append('api_key', saucenaoKey);
    
    const t = fileType(buffer);

    form.append('file', buffer, {
        filename: 'file.' + t.ext,
        contentType: t.mime
    });

    const resp = await new Promise((resolve, reject) => {
        form.submit('https://saucenao.com/search.php', (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        })
    });

    let json;
    try {
        resp.body = '';
        resp.setEncoding('utf8');
        resp.on('data', c => resp.body += c);

        await new Promise(e => resp.on('end', e));

        json = JSON.parse(resp.body);
    } catch (err) {
        throw resp;
    }

    return json;
}

function sortSauce(json) {
    const results = json.results;

    let finds = [];

    for (let i = 0; i < results.length; i++) {
        const r = results[i];

        const d = r.data;
        const h = r.header;

        const sourceURL = (d.ext_urls) ? d.ext_urls[0] : null;
        const thumbnailURL = h.thumbnail;

        // Title prioritisation
        const title = d.title || d.jp_name || d.source;
        const creator = (d.creator instanceof Array && d.creator[0]) || d.creator || d.member_name || d.author_name

        const sim = Number(h.similarity);

        finds.push({
            sourceURL,
            thumbnailURL,
            title,
            creator,
            sim
        });
    }

    // Sort based on similarity, descending
    finds.sort((a, b) => b.sim - a.sim);

    return finds;
}

function textify(data) {
    let ret = `(${data.sim}%) `;

    // Checks
    if (data.creator)
        ret += data.creator;

    if (data.title)
        ret += `${((data.creator) ? ' - ' + data.title : data.title)}`

    if (data.sourceURL)
        ret += `${((data.creator || data.title) ? ' - ' + data.sourceURL : data.sourceURL)}`;

    return ret;
}
module.exports = Source;