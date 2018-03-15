const sendQuote = require("../sendQuote.js");

module.exports = function(msg, args) {
    return sendQuote(msg, args[0], msg.channel);
};
