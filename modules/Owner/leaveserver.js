const Command = require('../../Types/command.js');

class Leaveserver extends Command {
    constructor() {
        super({
            "ownerOnly": true,
            "args": 1,
            "ignoreMin": true,

            helpText: 'Leaves specified server',
            helpArgs: {
                'Server ID': 'ID of the server, from which the bot will leave. Blank for server where the command has been run from.'
            }
        });
    }

    async run(bot, msg, args) {
        if (args.length == 0) {
            await msg.guild.leave();
        } else {
            const guild = await bot.user.guild.find('id', args);
            
            await guild.leave();
            await super.sendBasicSuccess('Left server!');
        }
    }
}
module.exports = Leaveserver;