const Discord = require('discord.js');
const validator = require('validator');

module.exports = async function(msg, cr) {
    // Server
    const serverColorRoles = msg.member.guild.roles.filter(x => x.name[0] == '#');

    // User
    const user = msg.guild.members.get(msg.author.id);
    const assignedUserColors = user.roles.filter(x => x.name[0] == '#');
    let userColor = assignedUserColors.first();

    if (assignedUserColors.find('name', cr)) {
        msg.channel.send(new Discord.RichEmbed()
        .setColor('RED')
        .setDescription('You already have this color!'))
        
        return;
    }

    try {
        if (serverColorRoles.exists('name', cr)) {
            // Color role exists on server, use old one
            const r = serverColorRoles.find('name', cr);

            await assignColorToUser(msg, r);
        } else {
            // Color doesn't exist on server, create a new one!
            const r = await msg.guild.createRole({
                name: cr,
                color: cr
            });
    
            await assignColorToUser(msg, r);
        }
    } catch (err) {
        throw err;
    }

    if (userColor != null)
        await handleOldColor(msg, userColor);
};

async function assignColorToUser(msg, r = null) {
    let tempRoles = msg.member.roles.filter(x => x.name[0] != '#').array();
    tempRoles.push(r);

    try {
        await msg.member.setRoles(tempRoles);
        console.log('Assigned color ' + r.name + ' to user ' + msg.author.username)
    } catch (err) {
        throw err;
    }
}

async function handleOldColor(msg, r) {
    if (r.members.size == 0) {
        await r.delete();
        console.log('Deleted role '+ r.name);
    }
}