const Command = require('../../Types/command.js');

class Help extends Command {
    constructor(cmdPass) {
        super({
            args: 2,
            ignoreMin: false
        });

        this.helpText = cmdPass.helpText;
    }

    async run(bot, msg, args) {
        
    }
}

function generateGenericResponse(helpText) {
    let ret = 'Hi! I\'m Rei and I\'m here to help you!\n\n' 
    + 'Want to add me to your server? Check out https://rei.dkboat.xyz/ for more information!\n'
    + 'Or use this link: https://discordapp.com/oauth2/authorize?client_id=278819964851322880&scope=bot&permissions=2146958591\n\n'
    + 'Need help? Got ideas? Just want to hang out? Come over to The Order of Spoon!\nhttps://discord.gg/Qr89Wav\n\n'
    + '    ▼ Commands (Default prefix "!") ▼\n';

    const keys = this.helpText.keys();

    for (let i = 0; i < keys.length; i += 3) {
        ret += `\`${this.helpText[keys[i]]}\`  \`${this.helpText[keys[i + 1]]}\`  \`${this.helpText[keys[i + 2]]}\``
    }

    return ret;
}