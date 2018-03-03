const Discord = require('discord.js');
const db = require('../../../../utils/dbUtil.js');

module.exports = async function(msg, args) {
    const rows = await db.getRows('quotes', { 'guildid': msg.guild.id });

    if (rows.length < 1)
        throw 'I can\'t find any quotes for this guild';

   let embed = new Discord.RichEmbed()
   .setTitle(`There are ${rows.length} quotes saved on this server!`)
   .setColor('BLUE');

   let description = '';
   for (let i = 0; i < rows.length; i++) {
       const row = rows[i];
       const userName = msg.guild.members.get(row.userid).user.tag;
       const isNsfw = msg.guild.channels.get(row.channelid).nsfw;

       description += `${userName}: **${row.name}** ${(isNsfw) ? '*(NSFW)*' : ''}\n`;
   }
   embed.setDescription(description);

   await msg.channel.send(embed);
}