const ReactionCommand = require('./reactioncommand');

const licks = [
    'https://i.imgur.com/jgwM4Ji.gif',
    'https://i.imgur.com/USpf8qs.gif',
    'https://i.imgur.com/VNaiTVY.gif',
    'https://i.imgur.com/4SNaKkk.gif',
    'https://i.imgur.com/Oa24gkc.gif',
    'https://i.imgur.com/dMDwqrs.gif',
    'https://i.imgur.com/DJEkl3H.gif',
    'https://i.imgur.com/n0vIuuG.gif',
    'https://i.imgur.com/xt3aS.gif',
    'https://i.imgur.com/5tTmSv3.gif',
    'https://i.imgur.com/qUYHuO7.gif',
    'https://i.imgur.com/8HLMJk2.gif',
    'https://i.imgur.com/0eJCsCP.gif'
];

class Lick extends ReactionCommand {
    constructor() {
        super(licks);
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, `**${msg.author.username}** licks **%target%**!`, args)
    }
}
module.exports = {
    command: Lick,
    help: {
        summary: "Sends a random lick in the chat.",
        args: {
            name: "user",
            summary: "Discord user that the lick is directed to.",
            required: false
        }
    }
};