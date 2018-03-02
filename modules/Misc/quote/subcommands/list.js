const Discord = require('discord.js');
const db = require('../../../../utils/dbUtil.js');

module.exports = async (msg, args) => {
    if(!(await db.ifRowExists('quotes', { 'guildid': msg.guild.id })))
        throw 'I can\'t find any quotes for this guild';

    const quotes = await db.getRow('quotes', { 'guildid': msg.guild.id });

    // Turn userids from quotes to usable data
    quotes.forEach(q => {
        q.user = msg.guild.members.get(q.userid).user.tag;
        q.nsfw = msg.guild.channels.get(q.channelid).nsfw;
    });
    
    await msg.channel.send(new Discord.RichEmbed()
    .setTitle(`A total of ${quotes.length} quotes were found for this guild`)
    .setDescription(
        quotes.map(q => 
            `__${q.name}__\n\tAdded by: **${q.user}** ${q.nsfw ? '*NSFW*' : ''}`
        ).join('\n'))
    .setColor('RANDOM'));
}