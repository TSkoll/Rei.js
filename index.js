const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();

const cmdHandler = new (require('./cmdHandler/cmdHandler.js'))(client);
// Database migration
(require('./utils/dbUtil.js')).migrate();
/*
    Config loading
*/
let config = { };
try {
    config = require('./data/config.json');
} catch (err) {
    config = { token: "", ownerid: "", defaultPrefix: "$" }

    // Create files
    fs.mkdirSync('./data/');
    fs.writeFileSync('./data/config.json', JSON.stringify(config));

    console.log("I noticed that you don't have an existing config file. I've created it at /data/config.json!");
    return 0;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username} [${client.user.id}]`)
});

client.on('message', async message => {
    console.log(`[${message.author.username}] ${message.content}`);
    let prefix = "=";
    if (message.content.startsWith(prefix)) {
        const cmdData = message.content.split(' ', 2);
        const cmd = cmdData[0].substring(prefix.length, cmdData[0].length);

        try {
            await cmdHandler.run(message, cmd, cmdData[1]);
        } catch(err) {
            message.channel.send(new Discord.RichEmbed()
            .setTitle('Woops!')
            .setDescription(err)
            .setFooter("You shouldn't be seeing this!"));
        }
    }
});

if (config.token != null)
    client.login(config.token);
