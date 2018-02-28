const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const db = require('../../utils/dbUtil.js');
const fs = require('fs');
const request = require('request');
const deleteImage = require('./tag/deleteImage.js');
const loadImage = require('./tag/loadImage.js');

class Tag extends Command {
    constructor() {
        super({
            'args': 3,
            'ignoreMin': true
        });
    }

    async run(bot, msg, args) {
        if(args.length < 1)
            throw 'Not enough arguments';
        switch(args[0]) {
            case 'set':
                if(await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[1] }))
                    throw 'Such tag already exists!';

                const img = msg.attachments.values().next().value;
                await db.addData('tags', {
                    'userid': msg.author.id,
                    'name': args[1],
                    'content': args[2] ? args[2] : null,
                    'imageid': msg.attachments.size > 0 ? img.id + img.filename.slice(img.filename.lastIndexOf('.')) : null
                });
                if(msg.attachments.size > 0)
                    await saveImage(msg.attachments.values().next().value);

                await this.sendBasicSuccess(msg, 'Tag saved!');
            break;
            case 'remove': {
                if(!(await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[1] })))
                    throw 'I can\'t delete a tag that doesn\'t exist!';

                const tagObj = (await db.getRow('tags', { 'userid': msg.author.id, 'name': args[1] }))[0];
                await db.deleteRows('tags', tagObj);
                if(tagObj.imageid)
                    await deleteImage(tagObj.imageid);

                await this.sendBasicSuccess(msg, 'Tag removed!');
            }
            break;
            case 'list': {
                if(!(await db.ifRowExists('tags', { 'userid': msg.author.id })))
                    throw 'You haven\'t saved any tags yet';
                
                const tags = await db.getRow('tags', { 'userid': msg.author.id });
                await msg.channel.send(new Discord.RichEmbed()
                    .setTitle(`So far you've saved ${tags.length} ${tags.length > 1 ? 'tags' : 'tag'}!`)
                    .setColor('RANDOM')
                    .setDescription(
                        tags.map(t => `**${t.name}**\n\t${t.content ? t.content.substr(0, 20) : ''}${t.content && t.content.length > 20 ? '...' : ''}${t.imageid ? ' *(has an image)*' : ''}`).join('\n')
                    ));
            }
            break;
            default: {
                if(!(await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[0] })))
                    throw 'I can\'t find the tag that you\'re looking for';

                const tagObj = (await db.getRow('tags', { 'userid': msg.author.id, 'name': args[0] }))[0];
                let content = '';
                const files = [];
                if(tagObj.content)
                    content = tagObj.content;
                if(tagObj.imageid)
                    files.push(await loadImage(tagObj.imageid));
                await msg.channel.send(content, { files });
            }
        }
    }
}

function saveImage(img) {
    return new Promise(resolve => {
        request(img.url)
            .pipe(fs.createWriteStream('./data/tagImages/' + img.id + img.filename.slice(img.filename.lastIndexOf('.'))))
            .on('close', resolve);
    });
}

module.exports = Tag;