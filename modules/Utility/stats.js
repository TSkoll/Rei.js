const Discord = require('discord.js');
const Command = require('../../Types/command.js');

class Stats extends Command {
    constructor() {
        super();
        this.startTime = Date.now();
    }

    async run(bot, msg, args) {
        await super.sendEmbed(msg, new Discord.RichEmbed()
        .setColor('BLUE')
        .setAuthor(bot.user.username, bot.user.avatarURL, 'https://rei.dkboat.xyz')
        .addField('Uptime', epochToTimeDifference(Date.now() - this.startTime))
        .addField('Servers', bot.guilds.size.toString())
        .addField('Memory usage', Math.round(process.memoryUsage().heapUsed / 1049000) + ' MiB'));
    }
}
module.exports = Stats;

function epochToTimeDifference(epoch) {
    const days = Math.floor(epoch / 86400000);
    const hours = Math.floor((epoch % 86400000) / 3600000);
    const minutes = Math.floor(((epoch % 86400000) % 3600000) / 60000);
    const seconds = Math.floor((((epoch % 86400000) % 3600000) % 60000) / 1000);

    return `${(days > 0) ? days + 'd' : ''} ${(hours > 0) ? hours + 'h': ''} ${(minutes > 0) ? minutes + 'm' : ''} ${seconds}s`
}
