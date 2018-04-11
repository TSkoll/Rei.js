const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    if (args.length < 2 || (args.length == 2 && msg.attachments.size == 0))
        throw 'Not enough arguments!';

    if (await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[1] }))
        throw 'A tag with that name already exists!';

    const img = (msg.attachments.size > 0) ? msg.attachments.first() : null;

    await db.addData('tags', {
        'userid': msg.author.id,
        'name': args[1],
        'content': args[2] ? args[2] : null,
        'imageid': (img) ? img.id + img.filename.slice(img.filename.lastIndexOf('.')) : null
    });

    // If image exists, save it to disk
    if (img)
        await tagUtils.saveImage(img);
}