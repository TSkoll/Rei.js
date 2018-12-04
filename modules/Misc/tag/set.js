const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');
const request = require('request-promise-native');

module.exports = async function(msg, args, webApiKey) {
    if (args.length < 2 || (args.length == 2 && msg.attachments.size == 0))
        throw 'Not enough arguments!';

    const img = (msg.attachments.size > 0) ? msg.attachments.first() : null;

    let form = {
        k: webApiKey,
        u: msg.author.id,
        tagName: args[1],
    };

    if (args[2])
        form.tagContent = args[2];

    if (img)
        form.fileContent = request(img.url);

    try {
        const resp = await request.post('http://reibot.xyz/tag/upload?k=' + webApiKey, {formData: form});

        if (resp == "OK")
            return;
        else
            throw resp;
    } catch (err) {
        throw err;
    }
}