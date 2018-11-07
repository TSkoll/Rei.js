const ReactionCommand = require('./reactioncommand');

const sleeps = [
    'https://i.imgur.com/jLHk2UK.gif',
    'https://i.imgur.com/wXCnHbg.gif',
    'https://i.imgur.com/yN20BIn.gif',
    'https://i.imgur.com/rqTjH76.gif',
    'https://i.imgur.com/CeG6KW3.gif',
    'https://i.imgur.com/Ab76Hw5.gif',
    'https://i.imgur.com/svmKNSx.gif',
    'https://i.imgur.com/HYVAdIZ.gif',
    'https://i.imgur.com/ugzAR5I.gif',
    'https://i.imgur.com/kfgYv68.gif',
    'https://i.imgur.com/xBcgSRZ.gif',
    'https://i.imgur.com/QqwDnOK.gif',
    'https://i.imgur.com/qNbmuGV.gif',
    'https://i.imgur.com/ekQmPjL.gif',
    'https://i.imgur.com/t2QC5XG.gif'
];

class Sleep extends ReactionCommand {
    constructor() {
        super(sleeps);
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, `**${msg.author.username}** puts **%target%** to sleep!`, args);
    }
}
module.exports = Sleep;