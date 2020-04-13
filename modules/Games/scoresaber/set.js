/**
 * Connects a Scoresaber profile to a Discord user.
 * @param {Discord.Message} msg Command message context.
 * @param {String} scoresaberLink Scoresaber profile link or ID.
 * @param {MongoClient} db MongoDB connector.
 */
async function Set(msg, scoresaberLink, db) {
  const scUserId = scoresaberLink.replace("https://scoresaber.com/u/", "");

  const sc = db.collection("sc");
  sc.updateOne({ id: msg.author.id }, { $set: { sc: scUserId, pp: 0 } }, { upsert: true });

  return "Scoresaber linked successfully!";
}
module.exports = Set;
