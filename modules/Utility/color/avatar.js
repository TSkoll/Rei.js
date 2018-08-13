const vibrant = require('node-vibrant');
const Discord = require('discord.js');

const generateImage = require('./image/image.js');
const assign = require('./assign.js');

module.exports = async function(msg, menusOpen) {

    // User avatar url in png format
    const url = msg.author.displayAvatarURL.substr(0, msg.author.displayAvatarURL.lastIndexOf('.'));

    const vBuilder = new vibrant.Builder(url, {
        colorCount: 64
    });

    const swatches = await vBuilder.getSwatches();

    // Go through swatches and select non-null colors
    let i = 0;
    let choices = [];
    choiceString = '';
    for (let key in swatches) {
        if (swatches[key] == null)
            continue;

        choices.push(swatches[key].getHex());
        choiceString += `${i + 1} -> ${swatches[key].getHex().toUpperCase()}\n`;

        i++;
    }   

    const choiceImg = await generateImage(choices, msg);
    const choiceMsg = await msg.channel.send('Select a color\n"exit" to exit the menu', { files: [choiceImg] });

    const msgC = new Discord.MessageCollector(msg.channel, a => a.author == msg.author, { time: 300000 });
    msgC.on('collect', async message => {

        // Allow exiting out of the menu
        if (message.content.toLowerCase() == 'exit') {
            msgC.stop();
            return;
        }

        if (!isNaN(message.content)) {
            try {
                if (Number(message.content) > 0 && Number(message.content) <= choices.length) {
                    const cr = choices[Number(message.content) - 1];
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

        menusOpen.splice(menusOpen.indexOf(msg.author.id), 1);
    });
};