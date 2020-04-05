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

        switch (subcommand) {
            case 'set':
                const success = await Set(msg, passthrough, this.db);
                await super.sendBasicSuccess(msg, success);
                break;
            case 'user':
                break;
            case 'top':
                break;
            case 'recent':
                break;
        }
    }
}
module.exports = ScoreSaber;