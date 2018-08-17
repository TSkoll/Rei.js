const ReactionCommand = require('./reactioncommand');

const eskimo = [
    'https://i.imgur.com/5YhTwcd.gif',
    'https://i.imgur.com/giZdJTR.gif',
    'https://i.imgur.com/B1u7ErN.gif'
]


class Eskimo extends ReactionCommand {
    constructor() {
        super(eskimo);
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, `**${msg.author.username}** eskimo kisses **%target%**!`, args)
    }
}
module.exports = Eskimo;