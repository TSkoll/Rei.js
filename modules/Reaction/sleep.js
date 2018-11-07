const ReactionCommand = require('./reactioncommand');
const Discord = require('discord.js');

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
        if (args) {
            const messages = await msg.channel.fetchMessages({limit: 5});
            const reiEmbedMessage = messages.find(x => x.author.id == bot.user.id && x.embeds.length > 0);
    
            if (reiEmbedMessage) {
                const embed = reiEmbedMessage.embeds[0];
                const eDesc = embed.description;

                // Make sure the embed we noticed is actually for sleeping
                if (eDesc && eDesc.includes('sleep')) {
                    // Clean description out of stuff we don't want, replace with REGEX later on
                    const previousUsers = eDesc.slice(0, eDesc.indexOf('put') - 1)
                                .split('**')
                                .filter(el => 
                                    el != "" &&
                                    el != ", " &&
                                    el != " and " &&
                                    el != " put " &&
                                    el != " to slee"
                                );
    
                    // + 5 due to "put(s) ", - 1 due to " "
                    const targetUserStart = eDesc.indexOf('put') + 5;
                    const targetUserEnd = eDesc.indexOf('to sleep!') - 1;
    
                    const targetUser = eDesc.slice(targetUserStart, targetUserEnd).replace(/\*/g, '');
                    const user = super.searchUser(msg, args);

                    if (targetUser === user.user.username) {
                        await reiEmbedMessage.edit(new Discord.RichEmbed()
                        .setColor(embed.hexColor)
                        .setImage(embed.image.url)
                        .setDescription(`${previousUsers.map(x => `**${x}**`).join(', ')} and **${msg.author.username}** put **${targetUser}** to sleep!`));

                        return;
                    }
                }
            }
        }
        
        await super.sendReaction(msg, `**${msg.author.username}** puts **%target%** to sleep!`, args);
    }
}
module.exports = Sleep;