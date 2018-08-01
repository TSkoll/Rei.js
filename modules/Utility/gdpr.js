const Command = require('../../Types/command.js');
const db = require('../../utils/dbUtil');

// Being transparent Kappa
class GDPR extends Command {
    constructor() {
        super()
    }

    async run(bot, msg, args) {
        const userid = msg.author.id;

        const rows = await db.getRows('colorhistory', { 'userid': userid })
        const crh = rows.map(r => r.color);

        super.sendBasicSuccess(msg, 'Following information is stored about you (other than tags and quotes you\'ve created):\nColor history:\n' + crh.join('\n'));
    }
}
module.exports = GDPR;