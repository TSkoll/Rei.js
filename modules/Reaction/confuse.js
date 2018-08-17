const ReactionCommand = require('./reactioncommand');

const confuses = [
    'https://i.imgur.com/B5ukYWx.gif',
    'https://i.imgur.com/cbehaSu.gif',
    'https://i.imgur.com/ud3ajmc.gif',
    'https://i.imgur.com/YZVRrYi.gif',
    'https://i.imgur.com/wl09J5l.gif',
    'https://i.imgur.com/ITCPruS.gif',
    'https://i.imgur.com/DwMWOhS.gif',
    'https://i.imgur.com/UJEMskZ.gif',
    'https://i.imgur.com/jFIFlO2.gif',
    'https://i.imgur.com/3s2fQ5S.gif',
    'https://i.imgur.com/XzDUOGe.gif',
    'https://i.imgur.com/jYr7Kjk.gif'
];

class Confuse extends ReactionCommand {
    constructor() {
        super(confuses, {
            aliases: [ 'wat' ]
        });
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, null, args)
    }
}
module.exports = Confuse;