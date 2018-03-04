const sendQuote = require('../sendQuote.js');

module.exports = function(msg, args) {
    return sendQuote(msg, 'rei is a shit bot', args.length == 2 ? msg.guild.channels.get(args[1]) : msg.channel);
}