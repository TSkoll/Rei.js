const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class Sleep extends Command {
    constructor() {
        super();
    }

    async run(bot, msg, args) {
        await super.sendEmbed(new Discord.RichEmbed()
        .setColor('DARK_BLUE')
        .setDescription('Good night!'));
        process.exit();
    }
}
module.exports = Sleep;