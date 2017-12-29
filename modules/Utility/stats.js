const Discord = require('discord.js');
const Command = require('../../Types/command.js');

class Stats extends Command {
    constructor(statTracker) {
        super();

        this.statTracker = statTracker;

        this.cpuStartTime = process.hrtime();
        this.cpuStartUsage = process.cpuUsage();
    }

    async run(bot, msg, args) {
        await super.sendEmbed(msg, new Discord.RichEmbed()
        .setColor('BLUE')
        .setAuthor(bot.user.username, bot.user.avatarURL, 'https://rei.dkboat.xyz')
        .addField('Uptime', epochToTimeDifference(Date.now() - this.statTracker.startTime), true)
        .addField('Servers', bot.guilds.size.toString(), true)
        .addField('Memory usage', Math.round(process.memoryUsage().heapUsed / 1049000) + ' MiB', true)
        .addField('Commands run', this.statTracker.commands, true)
        .addField('Messages received', this.statTracker.messages, true)
        .addField('CPU Usage', getCpuUsagePercent() + '%', true));
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

function getCpuUsagePercent() {
    let time = process.hrtime(this.cpuStartTime);
    let usage = process.cpuUsage(this.cpuStartUsage);

    const elapTime = calcElapTimeFromNanoToMs(time);
    const elapUser = nanoToMs(usage.user);
    const elapSyst = nanoToMs(usage.system);

    return cpuPercent = Math.round((100 * (elapUser + elapSyst) / elapTime) * 100) / 100;
}

function calcElapTimeFromNanoToMs(nanoSec) {
    return nanoSec[0] * 1000 + nanoSec[1] / 1000000;
}

function nanoToMs(nano) {
    return nano / 1000000;
}
