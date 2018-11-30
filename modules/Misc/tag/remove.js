const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');
const request = require('request-promise-native');

module.exports = async function(msg, args, webApiKey) {
    if (args.length < 2)
        throw 'Not enough arguments!';

    const tagName = args.slice(1).join(' ');

    const resp = await request.get(`http://localhost:3000/tag/delete/${tagName}?k=${webApiKey}&u=${msg.author.id}`);

    if (resp == "OK")
        return;
    else
        throw resp;
}