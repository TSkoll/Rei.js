const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

const Discord = require('discord.js');

module.exports = async function(msg, args) {
    // Get tags for that user
    const rows = await db.getRows('tags', { 'userid': msg.author.id });

    if (rows.length < 1)
        throw 'You haven\'t saved any tags yet';

    let embed = new Discord.RichEmbed()
    .setTitle(`You have ${rows.length} saved ${(rows.length == 1) ? 'tag' : 'tags'}`)
    .setColor('BLUE');

    let description = '';
    for (let i = 0; i < rows.length; i++) {
        // Build the description of tags from found rows
        const row = rows[i];

        let content = '';
        if (row.content)
            content = (row.content.length > 17)
                ? row.content.substring(0, 17) + '...'
                : content;
        
        description += `**${row.name}**: ${content} ${row.imageid ? ':frame_photo:' : ''}\n`;
    }
    embed.setDescription(description);

    msg.channel.send(embed);
}