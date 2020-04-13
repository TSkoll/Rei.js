const Command = require('../../Types/command.js');
const defaultPrefix = (require('../../data/config.json')).defaultPrefix;

class Prefix extends Command {
    constructor(cmdPass) {
        super({
            args: 2,
            ignoreMin: true,
            userPerms: ['MANAGE_GUILD']
        });

        this.prefixHandler = cmdPass.prefixHandler;
        this.db = cmdPass.db;
    }

    async run(bot, msg, args) {
        if (args == null)
            throw 'Not enough arguments!';

        switch(args[0].toLowerCase()) {
            case 'set':
                // Don't allow for null input, empty input or input with spaces
                if (args[1] && args[1].trim() != '' && !args[1].includes(' ')) {
                    await this.prefixHandler.set(msg.guild.id, args[1], this.db);
                    await super.sendBasicSuccess(msg, 'Prefix changed!');
                }
                else
                    throw 'Invalid prefix!'
                break;
            case 'clear':
                // prefixHandler set null sets to default prefix
                await this.prefixHandler.set(msg.guild.id, null, this.db);
                await super.sendBasicSuccess(msg, 'Prefix set back to default!');
                break;
            default:
                throw 'Unknown submenu';
        }
    }
}
module.exports = {
    command: Prefix,
    help: {
        summary: "Allows setting and clearing the server specific prefix.",
        requires: [
            "Manage Server"
        ],
        args: [
            {
                name: "subcommand",
                summary: `'Set': Set a prefix\n'Clear': Sets the prefix back to default ('${defaultPrefix}').`,
                required: true
            },
            {
                name: "prefix",
                summary: "The prefix which will be set for the server. Can't contain spaces",
                required: false
            }
        ]
    }
}