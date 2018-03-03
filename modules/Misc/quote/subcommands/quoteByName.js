const db = require('../../../../utils/dbUtil.js');
const sendQuote = require('../sendQuote.js');

module.exports = async function(msg, args) {
    const rows = await db.getRows('quotes', { 'guildid': msg.guild.id, 'name': args.join(' ') });

    if (rows.length < 1)
        throw 'I wasn\'t able to find the quote you were looking for.'

    const channel = msg.guild.channels.get(rows[0].channelid);

    return sendQuote(msg, rows[0].messageid, channel);
}