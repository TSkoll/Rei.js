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

    if (!userData[0].playerInfo)
        throw 'This player could not be found!'

    const col = db.collection('sc');
    const previous = await col.findOne({ id: msg.author.id });

    await col.updateOne({ id: msg.author.id }, { $set: { sc: previous.sc, pp: user.playerInfo.pp } });

    return `Gains till the last time: ${user.playerInfo.pp - previous.pp}pp`;
}
module.exports = gains;