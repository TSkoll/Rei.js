const Command = require("../../Types/command.js");
const Discord = require("discord.js");

class Sleep extends Command {
    constructor() {
        super({
            ownerOnly: true
        });
    }

    async run(bot, msg, args) {
        await super.sendEmbed(
            msg,
            new Discord.RichEmbed()
                .setColor("DARK_BLUE")
                .setDescription("Good night!")
        );

        await bot.destroy();
        process.exit();
    }
}
module.exports = Sleep;
