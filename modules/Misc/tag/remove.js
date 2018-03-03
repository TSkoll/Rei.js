const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    const rows = await db.getRows('tags', { 'userid': msg.author.id, 'name': args[1] });
    
    if (rows.length < 1)
        throw 'I can\'t delete a tag that doesn\'t exist!';

    await db.deleteRows('tags', rows[0]);
    if (rows[0].imageid)
        await tagUtils.deleteImage(rows[0].imageid);
}