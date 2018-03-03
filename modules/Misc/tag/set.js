const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    if (await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[1] }))
        throw 'A tag with that name already exists!';

    const img = msg.attachments.first().value;
    await db.addData('tags', {
        'userid': msg.author.id,
        'name': args[1],
        'content': args[2] ? args[2] : null,
        'imageid': (msg.attachments.size > 0) ? img.id + img.filename.slice(img.filename.lastIndexOf('.')) : null
    });

    if (msg.attachments.size > 0)
        await tagUtils.saveImage(img);
}