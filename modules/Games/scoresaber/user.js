const fetch = require('node-fetch');
const Discord = require('discord.js');

async function Set(msg, userProfile) {
    const id = userProfile.replace('https://scoresaber.com/u/', '');

    const resp = await (await fetch(`https://new.scoresaber.com/api/player/${id}/basic`)).json()

    return new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(resp.playerInfo.name, 
            'https://new.scoresaber.com' + resp.playerInfo.avatar, 
            'https://scoresaber.com/u/' + resp.playerInfo.playerid)
        .addField('this is my peepee', resp.playerInfo.pp + 'pp', true)
        .addField('Global Rank', '#' + resp.playerInfo.rank, true)
        .addField(`Country Rank [${resp.playerInfo.country}]`, '#' + resp.playerInfo.countryRank, true)
}
module.exports = Set;