const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    // Get the row user wants to delete
    const rows = await db.getRows('tags', { 'userid': msg.author.id, 'name': args.slice(1).join(' ') });
    
    if (rows.length < 1)
        throw 'I can\'t delete a tag that doesn\'t exist!';

    // Delete row from db and if image exists in tagImages, delete it too.
    await db.deleteRows('tags', rows[0]);
    if (rows[0].imageid)
        await tagUtils.deleteImage(rows[0].imageid);
}