const Discord = require('discord.js');
const db = require('../../../utils/dbUtil.js');

const maxMentions = 10;

module.exports = async function(msg, args) {
    if(args.length < 3)
        throw 'Not enough arguments!';

    const tag = (await db.getRows('tags', { 'userid': msg.author.id, 'name': args[1] }))[0];
    if(!tag)
        throw 'I can\'t share a tag that doesn\'t exist!';

    // Get all of the mentions from the message
    const awaitingUsers = [];
    Array.from(msg.mentions.users.values()).filter(u => !u.bot && u != msg.author).forEach(u => {
        if(!awaitingUsers.includes(u) && awaitingUsers.length < maxMentions)
            awaitingUsers.push(u);
    });

    if(awaitingUsers.length == 0)
        throw 'You have to mention users to share this tag to!';

    // Generate random code so users can confirm sharing
    const code = Math.random().toString(36).substr(2, 6);
    
    const msgC = new Discord.MessageCollector(
        msg.channel, 
        m => m.content.startsWith(code) && awaitingUsers.includes(m.author), 
        { time: 300000 }
    );

    msgC.on('collect', async m => {
        // Split message by spaces, remove the code and concat it together again
        const newName = m.content.split(' ').slice(1).filter(a => a != '').join(' ');

        if(await db.ifRowExists('tags', { 'userid': m.author.id, 'name': tag.name }) && !newName)
            return await msg.channel.send(`You have to provide a new name since you already have a tag with the same name`);

        // Fancy way for merging objects together
        const newTag = Object.assign({}, tag, { 'name': newName ? newName : tag.name, 'userid': m.author.id });

        await db.addData('tags', newTag);

        awaitingUsers.splice(
            awaitingUsers.indexOf(m.author), 1
        );

        await msg.channel.send(`You now have \`${newTag.name}\` tag on your list!`);

        if(awaitingUsers.length == 0)
            msgC.stop();
    });

    // Get user strings so we can mention all people who we are sharing tag to
    const allUsers = awaitingUsers.map(u => u.toString());

    const shareMsg = await msg.channel.send(`Please confirm if you want to recieve this tag by typing \`${code}\` in the chat!`);

    msgC.on('end', async() => {
        if(shareMsg && shareMsg.editable)
            await shareMsg.edit(shareMsg.content.replace(code, 'expired'));
    });
}