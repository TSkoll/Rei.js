const randomcolor = require('randomcolor');
const generateImage = require('./image/image.js');
const Discord = require('discord.js');

const assign = require('./assign.js');

module.exports = async function(msg) {
    const colors = randomcolor({ count: 6 });

    const choiceImg = await generateImage(colors, msg);
    const choiceMsg = await msg.channel.send('Select a color', { files: [choiceImg] });

    const msgC = new Discord.MessageCollector(msg.channel, a => a.author == msg.author, { time: 300000 });
    msgC.on('collect', async message => {
        if (!isNaN(message.content)) {
            try {
                if (Number(message.content) > 0 && Number(message.content) <= colors.length) {
                    const cr = colors[Number(message.content) - 1];
                    await assign(msg, cr.toUpperCase());

                    msgC.stop();
                    return;
                } else {
                    await msg.channel.send(new Discord.RichEmbed()
                    .setColor('RED')
                    .setDescription('That\'s not a valid choice, is it'))
                }
            } catch (err) {
                throw err;
            }
        }
    });

    msgC.on('end', () => {
        if (choiceMsg.deletable)
            choiceMsg.delete();
    })
}