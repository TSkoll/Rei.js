const ReactionCommand = require('./reactioncommand');

const eskimos = [
    'https://i.imgur.com/5YhTwcd.gif',
    'https://i.imgur.com/giZdJTR.gif',
    'https://i.imgur.com/B1u7ErN.gif'
];

class Eskimo extends ReactionCommand {
    constructor() {
        super(eskimos);
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, `**${msg.author.username}** eskimo kisses **%target%**!`, args)
    }
}
module.exports = {
    command: Eskimo,
    help: {
        summary: "Sends a random eskimo kiss gif in the chat.",
        args: {
            name: "user",
            summary: "Discord user that the eskimo kiss is directed to.",
            required: false
        }
    }
};