async function Set(msg, scoresaberLink, db) {
    const scUserId = scoresaberLink.replace('https://scoresaber.com/u/', '');

    const sc = db.collection('sc');
    sc.updateOne({ id: msg.author.id }, { $set: { sc: scUserId } }, { upsert: true });

    return 'Scoresaber linked successfully!';
}
module.exports = Set;