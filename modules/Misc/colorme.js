const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class Colorme extends Command {
    constructor() {
        super({
            hideFromHelp: true
        });
    }

    async run(bot, msg, args) {
        await super.sendEmbed(msg, new Discord.RichEmbed()
        .setColor('BLUE')
        .setDescription('colorme has been renamed to "color", you can use the new and improved command the same way as colorme before!'));
    }
}
module.exports = Colorme;