const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    if (args.length < 2)
        throw 'Not enough arguments!';

    // Get the row user wants to delete
    const rows = await db.getRows('tags', { 'userid': msg.author.id, 'name': args.slice(1).join(' ') });
    
    if (rows.length < 1)
        throw 'I can\'t delete a tag that doesn\'t exist!';

    // Delete row from db
    await db.deleteRows('tags', rows[0]);

    // Delete the image if it exists
    // and there are no other users with the same tag
    if (rows[0].imageid) {
        if(!(await db.ifRowExists('tags', { 'imageid': rows[0].imageid })))
            await tagUtils.deleteImage(rows[0].imageid);
    }
}