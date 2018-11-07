const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class Testpriority extends Command {
    constructor() {
        super({
            ownerOnly: true,
            args: 1
        });
    }

    async run(bot, msg, args) {
        const nQ = args.toLowerCase();

        const foundUsers = msg.guild.members.filter(x => x.user.username.toLowerCase().includes(nQ)
            || x.user.tag.toLowerCase() === nQ);

        const idk = foundUsers.map(el => `${el.user.username} - ${el.highestRole.calculatedPosition}`);
        const sorted = foundUsers.sort((a, b) => b.highestRole.calculatedPosition - a.highestRole.calculatedPosition)
            .map(el => `${el.user.username} - ${el.highestRole.calculatedPosition}`);

        await super.sendEmbed(msg, new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Pre', idk.join('\n'), false)
        .addField('After', sorted.join('\n'), false));
    }
}
module.exports = Testpriority;