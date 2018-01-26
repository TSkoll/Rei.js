const vibrant = require('node-vibrant');
const request = require('request-promise-native');

const Discord = require('discord.js');

module.exports = async function(msg) {
    const url = msg.author.displayAvatarURL.substr(0, msg.author.displayAvatarURL.lastIndexOf('.'));
    let img = await request.get({url: url, encoding: 'binary'});

    const s = await vibrant.from(Buffer.from(img, 'binary')).getSwatches();
    
    // flush img after processing, so we don't have to keep it in memory for up to 5 minutes
    img = null;

    let choices = [];
    for (let key in s) {
        choices.push(s[key]);
    }

    choiceString = '';
    for (let i = 0; i < choices.length; i++) {
        choiceString += `${i + 1} -> ${choices[i].getHex().toUpperCase()}\n`;
    }

    const choiceMsg = await msg.channel.send(new Discord.RichEmbed()
    .setColor('BLUE')
    .setTitle('Select color')
    .setDescription(choiceString));

    const msgC = new Discord.MessageCollector(msg.channel, a => a.author == msg.author, { time: 300000 });
    msgC.on('collect', message => {
        if (!isNaN(message.content)) {
            try {
                const cr = choices[Number(message.content) - 1].getHex();
                
                if (choiceMsg.deletable)
                    choiceMsg.delete();

                return cr;
            } catch (err) {
                throw err;
            }
        }
    });
}