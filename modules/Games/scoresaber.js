const Command = require('../../Types/command.js');

const Set = require('./scoresaber/set');
const User = require('./scoresaber/user');
const Gains = require('./scoresaber/gains');

class ScoreSaber extends Command {
    constructor(cmdPass) {
        super({
            args: 2,
            ignoreMin: true,
            aliases: ['sc']
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
                success = await User(msg, passthrough, this.db);
                await super.sendEmbed(msg, success);
                break;
            case 'gains':
                success = await Gains(msg, passthrough, this.db);
                await super.sendEmbed(msg, success);
                break;
            default:
                await super.sendBasicError(msg, 'Unknown or no subcommand')
        }
    }
}
module.exports = ScoreSaber;