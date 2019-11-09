const Discord = require('discord.js');

module.exports = async function(msg) {
    throw "Not implemented!";

    const userid = msg.author.id;

    const rows = await db.getRows('colorhistory', { userid });

    if (rows.length > 0) {
        let ret = '';

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            ret += row.color + '\n';
        }

        await msg.channel.send(new Discord.RichEmbed()
        .setColor('BLUE')
        .setDescription(ret));
    } else
        throw 'I could\'t find any color history for this user!'
}