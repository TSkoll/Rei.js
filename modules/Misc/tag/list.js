const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

const Discord = require('discord.js');
const request = require('request-promise-native');

module.exports = async function(msg, args, webApiKey) {
    let tags = JSON.parse(await request.get(`http://localhost:3000/tag/list?k=${webApiKey}&u=${msg.author.id}`));

    if (tags.length < 1)
        throw 'You haven\'t saved any tags yet';

    let embed = new Discord.RichEmbed()
    .setTitle(`You have ${tags.length} saved ${(tags.length == 1) ? 'tag' : 'tags'}`)
    .setColor('BLUE')
    .setDescription(tags.join('\n'));

    msg.channel.send(embed);
}