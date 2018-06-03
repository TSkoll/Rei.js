const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class Help extends Command {
    constructor(cmdPass) {
        super({
            args: 1,
            ignoreMin: false
        });

        this.helpTexts = require('../../data/help.json');
    }

    async run(bot, msg, args) {
        if (args == null) {
            // Send the generic response

            if (msg.channel.type != 'dm') {
                msg.author.send(generateGenericResponse(this.helpTexts, bot.user.username));
                await super.sendBasicSuccess(msg, 'Sent a DM!');
            } else {
                msg.author.send(generateGenericResponse(this.helpTexts, bot.user.username));
            }

            return;
        }

        // Command specific help
        const cmd = this.helpTexts[args.toLowerCase()];
        
        if (!cmd) {
            super.sendBasicError(msg, 'There doesn\'t seem to be any help text for this command!');
            return;
        }

        let embed = new Discord.RichEmbed()
        .setColor('BLUE')   
        .setTitle(args.toLowerCase())
        .setDescription(cmd.description)
        .setFooter(msg.prefix + cmd.usage);

        if (cmd.args) {
            // If arguments have been found, build it into the embed
            const keys = Object.keys(cmd.args);

            let args = `**${keys[0]}**: ${cmd.args[keys[0]]}`;
            for (let i = 1; i < keys.length; i++) {
                args += `\n\n**${keys[i]}**: ${cmd.args[keys[i]]}`
            }

            let examples = "";
            for (let i = 0; i < cmd.example.length; i++) {
                examples += '\n' + msg.prefix + cmd.example[i];
            }

            embed.addField('arguments', args);
            embed.addField('examples', examples);
        }

        if (cmd.aliases) {
            embed.addField('aliases', cmd.aliases.join(', '));
        }

        await super.sendEmbed(msg, embed);
    }
}
module.exports = Help;

function generateGenericResponse(helpTexts, name) {
    let ret = 'Hi! I\'m ' + name + ' and I\'m here to help you!\n\n' 
    + 'Invite: <https://discordapp.com/oauth2/authorize?client_id=280619682703212544&permissions=66186303&scope=bot>\n\n'
    + 'Need help? Got ideas? Just want to hang out? Come over to The Order of Spoon!\nhttps://discord.gg/Qr89Wav\n\n'
    + '▼ Commands (Default prefix "!")';

    const keys = Object.keys(helpTexts);

    for (let i = 0; i < keys.length; i++) {
        const cmd = helpTexts[keys[i]];
        
        if (cmd.hideFromHelp)
            continue;


        ret += '\n' + keys[i];
    }

    ret += '\n\nYou can do `!help (command)` to get more information about the specific command.'
    return ret;
}