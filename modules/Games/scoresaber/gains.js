const fetch = require('node-fetch');
const getUser = require('./utils/user.js');

async function gains(msg, userProfile, db) {
    // Don't allow usage of passthrough
    let id = await getUser(msg, null, db);

    const user = await fetch(`https://new.scoresaber.com/api/player/${id}/basic`).then(resp => resp.json());
    
    const col = db.collection('sc');
    const previous = await col.findOne({ id: msg.author.id });

    await col.updateOne({ id: msg.author.id }, { $set: { sc: previous.sc, pp: user.playerInfo.pp } });

    return `Change till last time this command was ran: ${user.playerInfo.pp - previous.pp}pp`;
}
module.exports = gains;