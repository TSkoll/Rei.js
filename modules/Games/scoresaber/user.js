const fetch = require('node-fetch');
const Discord = require('discord.js');

const getUser = require('./utils/user');
const diffMap = require('./utils/difficultymap');

async function Set(msg, userProfile, db) {
    let id = await getUser(msg, userProfile, db);

    const urls = [
        `https://new.scoresaber.com/api/player/${id}/basic`,
        `https://new.scoresaber.com/api/player/${id}/scores/top`
    ].map(url => fetch(url).then(resp => resp.json()));
    const userData = await Promise.all(urls);

    return new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(userData[0].playerInfo.name, 
            'https://new.scoresaber.com' + userData[0].playerInfo.avatar, 
            'https://scoresaber.com/u/' + userData[0].playerInfo.playerid)
        .addField('this is my peepee', userData[0].playerInfo.pp + 'pp', true)
        .addField('Global Rank', '#' + userData[0].playerInfo.rank, true)
        .addField(`Country Rank [${userData[0].playerInfo.country}]`, '#' + userData[0].playerInfo.countryRank, true)
        .addField('Top ranks', 
            userData[1].scores.map((s, i) => `**${i + 1}.** ${s.songAuthorName} - ${s.name} **[${diffMap(s.diff)}]** by **${s.levelAuthorName}**\n${((s.score / s.maxScoreEx) * 100).toFixed(2)}% - ${s.pp}pp`).slice(0, 3).join('\n\n'))
}
module.exports = Set;