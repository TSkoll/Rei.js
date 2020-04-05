const Command = require('../../Types/command.js');

const Set = require('./scoresaber/set');
const User = require('./scoresaber/user');

class ScoreSaber extends Command {
    constructor(cmdPass) {
        super({
            args: 2,
            ignoreMin: true
        });

        this.db = cmdPass.db;
     }

    async run(bot, msg, args) {
        const subcommand = args[0];
        const passthrough = args[1]

        let success;
        switch (subcommand) {
            case 'set':
                success = await Set(msg, passthrough, this.db);
                await super.sendBasicSuccess(msg, success);
                break;
            case 'user':
                success = await User(msg, passthrough);
                await super.sendEmbed(msg, success);
                break;
            case 'top':
                break;
            case 'recent':
                break;
        }
    }
}
module.exports = ScoreSaber;