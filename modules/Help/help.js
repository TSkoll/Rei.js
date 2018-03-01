const Command = require('../../Types/command.js');

class Help extends Command {
    constructor(cmdPass) {
        super({
            args: 1,
            ignoreMin: false
        });

        this.helpTexts = require('../../data/help.json');
    }

    async run(bot, msg, args) {
        if (args == null) {
            // Send the generic response

            if (msg.channel.type != 'dm') {
                msg.author.send(generateGenericResponse(this.helpTexts));
                await super.sendBasicSuccess(msg, 'Sent a DM!');
            } else {
                msg.author.send(generateGenericResponse(this.helpTexts));
            }

            return;
        }
    }
}
module.exports = Help;

function generateGenericResponse(helpTexts) {
    let ret = 'Hi! I\'m Rei and I\'m here to help you!\n\n' 
    + 'Want to add me to your server? Check out https://rei.dkboat.xyz/ for more information!\n\n'
    + 'Need help? Got ideas? Just want to hang out? Come over to The Order of Spoon!\nhttps://discord.gg/Qr89Wav\n\n'
    + '▼ Commands (Default prefix "!")';

    const keys = Object.keys(helpTexts);

    for (let i = 0; i < keys.length; i++) {
        const cmd = helpTexts[keys[i]];
        
        if (cmd.hideFromHelp)
            continue;


        ret += '\n' + keys[i];
    }

    return ret;
}