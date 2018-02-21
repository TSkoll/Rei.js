const Command = require('../../Types/command.js');
const db = require('../../utils/dbUtil.js');
const Discord = require('discord.js');
const timeUtil = require('../../utils/timeUtil.js');

class Quote extends Command {
    constructor() {
        super({
            'args': 3,
            'ignoreMin': true,
            'disallowDM': true
        });
    }

    async run(bot, msg, args) {
        if(args.length < 1)
            throw 'Not enough arguments';
        if(args[0] == 'set') {
            if(args.length < 3)
                throw 'Not enough arguments.';
            if(isNaN(args[1]))
                throw args[1] + ' is not a valid message ID.';
            if(!isNaN(args[2]))
                throw 'Quote names have to be alphanumeric.';
            let quoteMsg;
            try {
                quoteMsg = await msg.channel.fetchMessage(args[1]);
            } catch (e) {
                throw 'I couldn\'t find the message that you\'re looking for';
            }
            if(await db.ifRowExists('quotes', { 'guildid': msg.guild.id, 'name': args[2] }))
                throw 'Such quote already exists!';
            if(quoteMsg.type != 'DEFAULT')
                throw 'You can only save users\'s messages';

            await db.addData('quotes', {
                'guildid': msg.guild.id,
                'name': args[2],
                'channelid': msg.channel.id,
                'messageid': args[1],
                'userid': msg.author.id
            });

            await this.sendBasicSuccess(msg, 'Quote saved!');
        } else if(args[0] == 'remove') {
            if(await db.ifRowExists('quotes', { 'guildid': msg.guild.id, 'name': args.slice(1).join(' ') })) {
                const quoteObj = (await db.getRow('quotes', { 'guildid': msg.guild.id, 'name': args.slice(1).join(' ') }))[0];
                if(quoteObj.userid != msg.author.id)
                    throw 'You aren\'t the person that saved this quote!';

                await db.deleteRows('quotes', quoteObj);
                await this.sendBasicSuccess(msg, 'Quote removed!');
            } else
                throw 'I can\'t delete a quote that doesn\'t exist.';
        } else if(args[0] == 'list') {
            if(!(await db.ifRowExists('quotes', { 'guildid': msg.guild.id })))
                throw 'I can\'t find any quotes for this guild';

            const quotes = await db.getRow('quotes', { 'guildid': msg.guild.id });
            quotes.forEach(q => {
                q.user = bot.users.get(q.userid).tag;
                q.nsfw = msg.guild.channels.get(q.channelid).nsfw;
            });
            await msg.channel.send(new Discord.RichEmbed()
                .setTitle(`A total of ${quotes.length} quotes were found for this guild`)
                .setDescription(quotes.map(q => `__${q.name}__\n\tAdded by: **${q.user}** ${q.nsfw ? '*NSFW*' : ''}`).join('\n'))
                .setColor('RANDOM'));
        } else if(!isNaN(args[0])) {
            let quoteMsg;
            try {
                quoteMsg = await msg.channel.fetchMessage(args[0]);
            } catch (e) {
                throw 'I couldn\'t find the message that you\'re looking for';
            }
            if(quoteMsg.type != 'DEFAULT')
                throw 'You can only quote users\'s messages';
            await sendQuote(msg, quoteMsg);
        } else if(await db.ifRowExists('quotes', { 'guildid': msg.guild.id, 'name': args.join(' ') })) {
            const quoteObj = (await db.getRow('quotes', { 'guildid': msg.guild.id, 'name': args.join(' ') }))[0];
            const channel = msg.guild.channels.get(quoteObj.channelid);
            let quoteMsg;
            try {
                quoteMsg = await channel.fetchMessage(quoteObj.messageid);
            } catch (e) {
                throw 'I couldn\'t find the message that you\'re looking for';
            }
            if(channel.nsfw && !msg.channel.nsfw)
                throw 'You can\'t quote nsfw things here!';

            await sendQuote(msg, quoteMsg);
        } else
            throw 'I haven\'t found the quote that you\'re looking for.'
    }
}

async function sendQuote(msg, quoteMsg) {
    const timeDiff = timeUtil.calcTimeDifference(Date.now() - quoteMsg.createdTimestamp);
    const diffString = `${timeDiff.years > 0 ? timeDiff.years > 1 ? timeDiff.years + ' years ago' : '1 year ago' 
        : timeDiff.months > 0 ? timeDiff.months > 1 ? timeDiff.months + ' months ago' : '1 month ago'
        : timeDiff.days > 0 ? timeDiff.days > 1 ? timeDiff.days + ' days ago' : 'yesterday'
        : timeDiff.hours > 0 ? timeDiff.hours > 1 ? timeDiff.hours + ' hours ago' : '1 hour ago'
        : timeDiff.minutes > 0 ? timeDiff.minutes > 1 ? timeDiff.minutes + ' minutes ago' : 'a minute ago'
        : timeDiff.seconds > 10 ? timeDiff.seconds + ' seconds ago' : 'just now'}`;
    const embed = new Discord.RichEmbed();
    let content = '';
    if(quoteMsg.embeds.length > 0 && quoteMsg.embeds.find(e => e.type == 'rich')) {
        const quoteObj = quoteMsg.embeds.find(e => e.type == 'rich');
        content = `**${quoteMsg.author.tag}** sent this embed ${diffString}`;
        if(quoteMsg.content)
            content += `\n\n${quoteMsg.content}`;
        embed.setColor(quoteObj.color);
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
        quoteObj.fields.forEach(field => embed.addField(field.name, field.value, field.inline));
    } else {
        embed.setColor('RANDOM')
            .setAuthor(quoteMsg.author.tag, quoteMsg.author.avatarURL)
            .setDescription(quoteMsg.cleanContent)
            .setFooter(`Sent ${diffString}`);
        if(quoteMsg.attachments.size > 0) {
            const attachments = Array.from(quoteMsg.attachments.values());
            embed.setImage(attachments[0].url);
            if(attachments.length > 1)
                embed.addField('Message contains more attachments than just one.', `A total of ${attachments.length} were found.`);
        }
    }

    await msg.channel.send(content, { embed });
}

module.exports = Quote;