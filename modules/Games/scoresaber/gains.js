const Discord = require('discord.js');
const fetch = require('node-fetch');

const getUser = require('./utils/user.js');

/**
 * Gets the pp gains of a scoresaber user.
 * @param {Discord.Message} msg Command message contenxt
 * @param {String} userProfile Scoresaber user profile or id
 * @param {MongoClient} db MongoDB connector.
 */
async function gains(msg, userProfile, db) {
    // Don't allow usage of passthrough
    let id = await getUser(msg, null, db);

    const user = await fetch(`https://new.scoresaber.com/api/player/${id}/basic`).then(resp => resp.json());

    if (!user.playerInfo)
        throw 'This player could not be found!'

    const col = db.collection('sc');
    const previous = await col.findOne({ id: msg.author.id });
    const ranks = presentRank(previous, user.playerInfo.rank);

    await col.updateOne({ id: msg.author.id }, { $set: { sc: previous.sc, pp: user.playerInfo.pp, rank: user.playerInfo.rank } });

    return new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Gains till the last time: ${(user.playerInfo.pp - previous.pp).toFixed(3)}pp${ranks.inMessage}`)
        .setFooter(`${previous.pp}pp -> ${user.playerInfo.pp}pp${ranks.inFooter}`);
}

function presentRank(sc, userRank) {
    if (sc.rank)
        return {
            inMessage: ` (#${userRank - sc.rank})`,
            inFooter: ` (#${sc.rank} -> #${userRank})`
        };
    else
        return {
            inMessage: '',
            inFooter: ''
        };
}
module.exports = gains;