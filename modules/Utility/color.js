const Command = require('../../Types/command.js');
const c = require('./color/avatar.js');

const avatar = require('./color/avatar.js');

const Discord = require('discord.js');
const validator = require('validator');

class Color extends Command {
    constructor() {
        super({
            args: 1
        });
    }

    async run(bot, msg, args) {
        // Possible choices
        switch (args) {
            case 'avatar':
                const cr = await avatar(msg);
                await ApplyColor(msg, cr);
                break;
            case null:
                await ApplyColor(msg, 'remove');
                break;
            default:
                await ApplyColor(msg, args);
                break;
        }
    }
}
module.exports = Color;

async function ApplyColor(msg, cr) {
    // Server
    const serverColorRoles = msg.member.guild.roles.filter(x => x.name[0] == '#');

    // User
    const user = msg.guild.members.get(msg.author.id);
    const assignedUserColors = user.roles.filter(x => x[0] == '#').array();
    let userColor = null;

    if (assignedUserColors)
        userColor = assignedUserColors[0].name;

    if (cr == 'remove') {
        await user.removeRoles(serverColorRoles);
        await msg.send(new Discord.RichEmbed()
        .setColor('GREEN')
        .setDescription('Color removed!'));

        return;
    }

    if (cr[0] == '#')
        cr == cr.substr(1);

    if (!validator.isHexColor(cr)) {
        throw 'This doesn\'t seem to be a valid color!';
    }
    
    cr = '#' + cr.toUpperCase();
    if (!serverColorRoles.exists('name', cr)) {
        const r = await msg.guild.createRole({
            name: cr,
            color: cr
        });

        let tempRoles = user.roles.filter(x => x.name[0] != '#').array();
        tempRoles.push(r);

        await user.setRoles(tempRoles);
        await sendSuccess(msg);
    } else if (user.roles.exists('name', cr)) {
        throw 'User already has this color!';
    } else {
        const sRole = serverColorRoles.find(x => x.name == cr);

        let tempRoles = user.roles.filter(x => x.name[0] != '#').array();
        tempRoles.push(sRole);

        await user.setRoles(tempRoles);
        await sendSuccess(msg);

        return;
    }
}

async function sendSuccess(msg) {
    return await msg.send(new Discord.RichEmbed()
    .setColor('GREEN')
    .setDescription('Color set!'));
}