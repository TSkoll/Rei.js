const Command = require('../../Types/command.js');

class Help extends Command {
    constructor(cmdPass) {
        super({
            args: 1,
            ignoreMin: false
        });

        this.helpTexs = cmdPass.helpTexts;
    }

    async run(bot, msg, args) {
        if (args == null) {
            await msg.channel.send(generateGenericResponse(this.helpTexts));
            return;
        }
    }
}
module.exports = Help;

function generateGenericResponse(helpTexts) {
    let ret = 'Hi! I\'m Rei and I\'m here to help you!\n\n' 
    + 'Want to add me to your server? Check out https://rei.dkboat.xyz/ for more information!\n'
    + 'Or use this link: https://discordapp.com/oauth2/authorize?client_id=278819964851322880&scope=bot&permissions=2146958591\n\n'
    + 'Need help? Got ideas? Just want to hang out? Come over to The Order of Spoon!\nhttps://discord.gg/Qr89Wav\n\n'
    + '    ▼ Commands (Default prefix "!") ▼';

    const keys = helpTexts.keys();

    for (let i = 0; i < keys.length; i++) {
        ret += '\n`' + helpTexts[keys[i]] + '`';
    }

    return ret;
}