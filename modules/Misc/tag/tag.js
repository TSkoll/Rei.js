const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');
const request = require('request-promise-native');

module.exports = async function(msg, args, webApiKey) {
    const tagName = args.join(' ');

    const tagDl = await request.get(`http://reibot.xyz/tag/get/${tagName}?k=${webApiKey}&u=${msg.author.id}`);
    const tag = JSON.parse(tagDl);

    let content = (tag.content) ? tag.content : '';
    let file = null;

    if (tag.file)
        file = await request({ url: `http://reibot.xyz/file/get/${tag.file}?k=${webApiKey}&u=${msg.author.id}`, encoding: null});

    if (file)
        await msg.channel.send(content, { files: [ { attachment: file, name: tag.file } ] });
    else
        await msg.channel.send(content);
}