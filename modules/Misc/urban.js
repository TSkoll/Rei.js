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

        const data = JSON.parse(await request.get(`http://api.urbandictionary.com/v0/define?term=${args}`)).list;

        if (data.length == 0) {
            await super.sendBasicError(msg, 'Urban Dictionary returned nothing for this query!')
            return;
        }

        data.sort((a, b) => b.thumbs_up - a.thumbs_up);

        const top = data.find(x => x.word.toLowerCase() == args.toLowerCase()) || data[0];

        await super.sendEmbed(msg, new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(top.word, null, top.permalink)
        .addField('Definition', top.definition)
        .addField('Example', top.example || 'No example')
        .setFooter(`Author: ${top.author} | ${top.thumbs_up}👍 ${top.thumbs_down}👎`));
    }
}
module.exports = Urban;