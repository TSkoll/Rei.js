const Discord = require('discord.js');
const { calcTimeDifference } = require('../../../utils/timeUtil.js');

module.exports = async (msg, id, channel) => {
    let quoteMsg;
    try {
        quoteMsg = await channel.fetchMessage(id);
    } catch (e) {
        throw 'I couldn\'t find the message that you\'re looking for';
    }

    if(quoteMsg.type != 'DEFAULT')
        throw 'You can only quote users\'s messages';

    if(channel.nsfw && !msg.channel.nsfw)
        throw 'You can\'t quote nsfw things here!';

    /* 
    If quoted message has one or more embeds (within which at least one is a rich embed), 
    send an embed from the quoted message and the content (if that message has one)
    otherwise, send content and attachments in an embed
    */
    if(quoteMsg.embeds.length > 0 && quoteMsg.embeds.find(e => e.type == 'rich'))
        return quoteWithEmbed(msg, quoteMsg);
    else
        return defaultQuote(msg, quoteMsg);
}

function quoteWithEmbed(msg, quoteMsg) {
    //Find rich embed in messages' embeds
    const quoteObj = quoteMsg.embeds.find(e => e.type == 'rich');
    
    //Declare content string so if message has its own, we can just concatenate them
    let content = `**${quoteMsg.author.tag}** sent this embed ${diffString(quoteMsg)}`;
    if(quoteMsg.content)
        content += `\n\n${quoteMsg.content}`;

    return sendQuote(msg, parseMessageEmbed(quoteObj), content);
}

function parseMessageEmbed(quoteObj) {
    const embed = new Discord.RichEmbed().setColor(quoteObj.color);

    /*
    Check for each embed property, since they're optional,
    we have to check if an embed has them to not accidentally try to set something to undefined
    */
    if(quoteObj.description)
      embed.setDescription(quoteObj.description);
    if(quoteObj.author)
       embed.setAuthor(quoteObj.author.name, quoteObj.author.iconURL, quoteObj.author.url);
    if(quoteObj.title)
       embed.setTitle(quoteObj.title);
    if(quoteObj.thumbnail)
       embed.setThumbnail(quoteObj.thumbnail.url);
    if(quoteObj.image)
       embed.setImage(quoteObj.image.url);
    if(quoteObj.createdTimestamp)
       embed.setTimestamp(quoteObj.createdTimestamp);
    if(quoteObj.footer)
       embed.setFooter(quoteObj.footer.text, quoteObj.footer.iconURL);

    //For each of quote's embed's fields add a new field to the new embed
    quoteObj.fields.forEach(field => embed.addField(field.name, field.value, field.inline));

    return embed;
}

function defaultQuote(msg, quoteMsg) {
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(quoteMsg.author.tag, quoteMsg.author.avatarURL)
        .setDescription(quoteMsg.cleanContent)
        .setFooter(`Sent ${diffString(quoteMsg)}`);

    //If quoted message has attachments...
    if(quoteMsg.attachments.size > 0) {
        //...attach first of them to the embed
        const attachments = Array.from(quoteMsg.attachments.values());
        embed.setImage(attachments[0].url);

        //and if that message has more attachments, just say the total amount of them
        if(attachments.length > 1)
            embed.addField('Message contains more attachments than just one.', `A total of ${attachments.length} were found.`);
    }

    return sendQuote(msg, embed);
}

async function sendQuote(msg, embed, content = '') {
    await msg.channel.send(content, { embed });
}

function diffString (quoteMsg) {
    //Get an object with time differences between now and when the quoted message was sent
    const timeDiff = calcTimeDifference(Date.now() - quoteMsg.createdTimestamp);

    for (const key in timeDiff) {
        //If that time difference is greater than 0
        if (timeDiff[key] > 0) {
            //and greater than one, just return it
            if(timeDiff[key] > 1)
                return `${timeDiff[key]} ${key} ago`;
            //otherwise crop 's' from the end (I hate when something says for example '1 hours' so I had to do it this way)
            else
                return `1 ${key.slice(0, -1)} ago`;
        }
    }

    //If somehow someone tries to quote a message that was sent less than a second ago, just return 'now' (doubt that this could ever happen)
    return 'now';
}

    // return `${timeDiff.years > 0 ? timeDiff.years > 1 ? timeDiff.years + ' years ago' : '1 year ago' 
    //     : timeDiff.months > 0 ? timeDiff.months > 1 ? timeDiff.months + ' months ago' : '1 month ago'
    //     : timeDiff.days > 0 ? timeDiff.days > 1 ? timeDiff.days + ' days ago' : 'yesterday'
    //     : timeDiff.hours > 0 ? timeDiff.hours > 1 ? timeDiff.hours + ' hours ago' : '1 hour ago'
    //     : timeDiff.minutes > 0 ? timeDiff.minutes > 1 ? timeDiff.minutes + ' minutes ago' : 'a minute ago'
    //     : timeDiff.seconds > 10 ? timeDiff.seconds + ' seconds ago' : 'just now'}`;
