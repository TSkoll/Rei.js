const Discord = require('discord.js');

module.exports = async function(msg, db) {
    const userid = msg.author.id;

    let ret = '';

    const cursor = db.collection('colorHistory').find({ userid });
    const c = await cursor.count();
    if (c == 0) {
        cursor.close();
        throw 'I could\'t find any color history for this user!';
    }

    await cursor.forEach(row => {
        ret += row.color + '\n';
    });
    cursor.close();

    await msg.channel.send(new Discord.RichEmbed()
        .setColor('BLUE')
        .setDescription(ret));
}