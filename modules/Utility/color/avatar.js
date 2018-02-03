const vibrant = require('node-vibrant');
const request = require('request-promise-native');

const Discord = require('discord.js');

const assign = require('./assign.js');

module.exports = async function(msg) {
    // User avatar url in png format
    const url = msg.author.displayAvatarURL.substr(0, msg.author.displayAvatarURL.lastIndexOf('.'));

    let img = await request.get({url: url, encoding: 'binary'});

    // Generate swatches from image buffer
    const swatches = await vibrant.from(Buffer.from(img, 'binary')).getSwatches();

    // flush img from memory
    img = null;

    let i = 0;
    let choices = [];
    choiceString = '';
    for (let key in swatches) {
        choices.push(swatches[key]);
        choiceString += `${i + 1} -> ${swatches[key].getHex().toUpperCase()}\n`;

        i++;
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

                assign(msg, cr);
                return;
            } catch (err) {
                throw err;
            }
        }
    });
};