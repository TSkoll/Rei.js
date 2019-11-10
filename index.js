const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client({ disableEveryone: true });
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient('mongodb://localhost:27017')

process.on('exit', code => {
    mongoClient.close();
    console.log(`Exiting witrh code ${code}`);
})

/*
    Config loading
*/
let config = { };
try {
    config = require('./data/config.json');
} catch (err) {
    config = { token: "", ownerId: "", defaultPrefix: "$", saucenaoKey: "" }

    fs.writeFileSync('./data/config.json', JSON.stringify(config));

    console.log("I noticed that you don't have an existing config file. I've created it at /data/config.json!");
    return 0;
}

let statTracker = require('./utils/statTracker.js');
statTracker = new statTracker();

let prefixHandler = require('./msgHandler/prefixHandler.js');
prefixHandler = new prefixHandler();

const saucenaoKey = config.saucenaoKey;

mongoClient.connect(err => {
    if (err)
        throw 'Couldn\'t connect to MongoDB!\n' + err

    const db = mongoClient.db('emi');
    const cmdPass = {
        prefixHandler,
        statTracker,
        saucenaoKey,
        db
    }

    let msgHandler = require('./msgHandler/msgHandler.js');
    msgHandler = new msgHandler(client, cmdPass);

    /*
    Discord.js events
    */
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.username} [${client.user.id}]`)
    });

    client.on('message', async message => {
        try {
            await msgHandler.onMessageEvent(message);
        } catch (err) {
            console.error(err);
        }
    });

    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (oldMessage.author.id == client.user.id || oldMessage.isCommand)
            return;

        // If update happens within a minute of the original message
        if ((Date.now() - newMessage.createdTimestamp) < 60000) {
            try {
                await msgHandler.onMessageEvent(newMessage);
            } catch (err) {
                console.error(err);
            }
        }
    });

    if (config.token != null)
        client.login(config.token);
    else
        throw 'Token could not be found!';
});