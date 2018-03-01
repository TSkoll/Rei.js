const Command = require('../../Types/command.js');
const feedbackChannelId = '396583338116120576';

class Feedback extends Command {
    constructor() {
        super({
            "args": 1,

            helpText: 'Leaves feedback to the developer server.',
            helpArgs: {
                'Feedback': 'Feedback that\'s left, can only be text.'
            }
        });
    }

    async run(bot, msg, args) {
        const feedbackChannel = bot.channels.get(feedbackChannelId);

        await feedbackChannel.send(`${msg.author.username}#${msg.author.discriminator} [${msg.author.id}]\n\`\`\`${args}\`\`\``);
        await super.sendBasicSuccess(msg, 'Feedback left!');
    }
}
module.exports = Feedback;