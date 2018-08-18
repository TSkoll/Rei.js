const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client({ disableEveryone: true });

const dbUtil = require('./utils/dbUtil.js');

/*
    Config loading
*/
let config = { };
try {
    config = require('./data/config.json');
} catch (err) {
    config = { token: "", ownerId: "", defaultPrefix: "$", saucenaoKey: "" }

    fs.mkdirSync('./data/');
    fs.writeFileSync('./data/config.json', JSON.stringify(config));

    console.log("I noticed that you don't have an existing config file. I've created it at /data/config.json!");
    return 0;
}


let statTracker = require('./utils/statTracker.js');
statTracker = new statTracker();

let prefixHandler = require('./msgHandler/prefixHandler.js');
prefixHandler = new prefixHandler();

const saucenaoKey = config.saucenaoKey;

const cmdPass = {
    prefixHandler,
    statTracker,
    saucenaoKey
}

let msgHandler = require('./msgHandler/msgHandler.js');
msgHandler = new msgHandler(client, cmdPass);

dbUtil.migrate();

/*
    Discord.js events
*/
client.on('ready', () => {
    console.log(`Logged in as ${client.user.username} [${client.user.id}]`)
});

client.on('message', async message => {
    // Pass event to message handler for handling
    await msgHandler.onMessageEvent(message)
    .catch(err => {
        console.error(err);
    });
});

if (config.token != null)
    client.login(config.token);
else
    console.error('Token could not be found!');
