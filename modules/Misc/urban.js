const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch')

class Urban extends Command {
    constructor() {
        super({
            args: 1
        });
    }

    async run(bot, msg, args) {
        if (!args)
            throw 'Not enough arguments!'

        const resp = await fetch(`http://api.urbandictionary.com/v0/define?term=${args}`).then(resp => resp.json());
        const data = resp.list;

        if (data.length == 0) {
            await super.sendBasicError(msg, 'Urban Dictionary returned nothing for this query!')
            return;
        }

        data.sort((a, b) => b.thumbs_up - a.thumbs_up);

        const top = data.find(x => x.word.toLowerCase() == args.toLowerCase()) || data[0];

        await super.sendEmbed(msg, new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(top.word, null, top.permalink)
        .addField('Definition', top.definition)
        .addField('Example', top.example || 'No example')
        .setFooter(`Author: ${top.author} | ${top.thumbs_up}👍 ${top.thumbs_down}👎`));
    }
}
module.exports = {
    command: Urban,
    help: {
        summary: "Gets an article from the urban dictionary.",
        args: [
            {
                name: "term",
                summary: "The term that's used in the search.",
                required: true
            }
        ]
    }
};