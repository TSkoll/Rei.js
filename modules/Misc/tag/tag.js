const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    const rows = await await db.getRows('tags', { 'userid': msg.author.id, 'name': args[0] });

    if (rows.length < 1)
        throw 'This tag doesn\'t seem to exist!';

    let content = ''
    const files = [];

    if (rows[0].content)
        content = rows[0].content;

    if (rows[0].imageid)
        files.push(await tagUtils.loadImage(rows[0].imageid));

    await msg.channel.send(content, { files });
}