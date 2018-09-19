const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const request = require('request-promise-native');

class Urban extends Command {
    constructor() {
        super({
            args: 1
        });
    }

    async run(bot, msg, args) {
        if (!args)
            throw 'Not enough arguments!'

        const data = await request.get(`http://api.urbandictionary.com/v0/define?term=${args}`);

        if (data.length == 0) {
            await super.sendBasicError('Urban Dictionary returned nothing for this query!')
            return;
        }

        data.sort((a, b) => a.thumbs_up - b.thumbs_up);

        const top = data[0];

        await super.sendEmbed(new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(top.word, null, top.permalink)
        .addField('Definition', top.definition)
        .addField('Example', top.example)
        .setFooter(`Author: ${top.author} | ${top.thumbs_up}👍 ${top.thumbs_down}👎`));
    }
}
module.exports = Urban;