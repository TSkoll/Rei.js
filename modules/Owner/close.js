const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class Close extends Command {
    constructor() {
        super({
            ownerOnly: true
        });
    }

    async run(bot, msg, args) {
        await super.sendEmbed(msg, new Discord.MessageEmbed()
        .setColor('DARK_BLUE')
        .setDescription('Good night!'));
        
        bot.destroy();
        process.exit();
    }
}
module.exports = Close;