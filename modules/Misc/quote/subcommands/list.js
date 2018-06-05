const Discord = require('discord.js');
const db = require('../../../../utils/dbUtil.js');

module.exports = async function(msg, args) {
    const rows = await db.getRows('quotes', { 'guildid': msg.guild.id });

    if (rows.length < 1)
        throw 'I can\'t find any quotes for this guild';

   let embed = new Discord.RichEmbed()
   .setColor('BLUE');

    let description = '';
    let realFinds = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const channel = msg.guild.channels.get(row.channelid);
        const member = msg.guild.members.get(row.userid);

        // Ignore deleted channels
        if (channel) {
            const userName = (member && member.user.tag) || row.userid;
            const isNsfw = channel.nsfw;
    
            description += `${userName}: **${row.name}** ${(isNsfw) ? '*(NSFW)*' : ''}\n`;
            realFinds++;
        }
    }

    if (realFinds < 1)
        throw 'I can\'t find any quotes for this guild';

    embed.setTitle(`There ${((realFinds == 1) ? 'is 1 quote' : 'are ' + realFinds + ' quotes')} saved on this server!`)
    .setDescription(description);

   await msg.channel.send(embed);
}