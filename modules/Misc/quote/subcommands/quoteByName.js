const db = require('../../../../utils/dbUtil.js');
const sendQuote = require('../sendQuote.js');

module.exports = async function(msg, args) {
    if(!(await db.ifRowExists('quotes', { 'guildid': msg.guild.id, 'name': args.join(' ') })))
        throw 'I haven\'t found the quote that you\'re looking for.'
    
    const quoteObj = (await db.getRows('quotes', { 'guildid': msg.guild.id, 'name': args.join(' ') }))[0];
    const channel = msg.guild.channels.get(quoteObj.channelid);
    
    return sendQuote(msg, quoteObj.messageid, channel);
}