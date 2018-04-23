const Discord = require('discord.js');
const db = require('../../../utils/dbUtil.js');

module.exports = async function(msg, args) {
    if(args.length < 3)
        throw 'Not enough arguments!';

    const tag = (await db.getRows('tags', { 'userid': msg.author.id, 'name': args[1] }))[0];
    if(!tag)
        throw 'I can\'t share a tag that doesn\'t exist!';

    if(msg.mentions.users.size == 0)
        throw 'You have to mention users to share this tag to!';

    // Get all of the mentions from the message
    const awaitingUsers = Array.from(msg.mentions.users.values());

    // Generate random code so users can confirm sharing
    const code = Math.random().toString(36).substr(2, 6);
    
    for(const user of awaitingUsers) {
        // Can't share the tag with yourself and bot accounts
        if(user.bot || user == msg.author) {
            awaitingUsers.splice(
                awaitingUsers.indexOf(user.id), 1
            );
            continue;
        }

        const msgC = new Discord.MessageCollector(msg.channel, a => a.author == user, { time: 300000 });
        msgC.on('collect', async message => {
            if(!message.content.startsWith(code))
                return;

            // Split message by spaces, remove the code and concat it together again
            const newName = message.content.split(' ').slice(1).join(' ');

            if(await db.ifRowExists('tags', { 'userid': user.id, 'name': tag.name }) && !newName)
                return await msg.channel.send(`${user}, you have to provide a new name since you already have a tag with the same name`);

            // Fancy way for merging objects together
            const newTag = Object.assign(tag, { 'name': newName ? newName : tag.name, 'userid': user.id });

            await db.addData('tags', newTag);
            await msg.channel.send(`${user} you now have ${newTag.name} tag on your list!`);

            msgC.stop();
        });

        msgC.on('end', c => {
            awaitingUsers.splice(
                awaitingUsers.indexOf(c.first().author.id), 1
            );
        });
    }

    // Get user strings so we can mention all people who we are sharing tag to
    const allUsers = awaitingUsers.map(u => u.toString());
    if(allUsers.length > 0)
        await msg.channel.send(`${allUsers.join(' ')} please confirm if you want to recieve this tag by typing \`${code}\` in the chat!`);
}