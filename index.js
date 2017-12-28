const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();

let msgHandler = new (require('./msgHandler/msgHandler.js'))(client);
let test = require('./msgHandler/msgHandler.js');
msgHandler = new test(client);

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
    // Pass event to message handler
    await msgHandler.onMessageEvent(message)
    .catch(err => {
        console.error(err);
    });
});

if (config.token != null)
    client.login(config.token);
