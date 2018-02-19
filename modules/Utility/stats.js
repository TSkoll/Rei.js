const Discord = require('discord.js');
const Command = require('../../Types/command.js');
const timeUtil = require('../../utils/timeUtil.js');

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
    const diff = timeUtil.calcTimeDifference(epoch);

    return `${(diff.years > 0) ? diff.years + 'y' : ''} ${(diff.months > 0) ? diff.months + 'm' : ''} ${(diff.days > 0) ? diff.days + 'd' : ''} ${(diff.hours > 0) ? diff.hours + 'h': ''} ${(diff.minutes > 0) ? diff.minutes + 'min' : ''} ${diff.seconds}s`
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
