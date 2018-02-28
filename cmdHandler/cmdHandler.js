const Discord = require('discord.js');

const argParser = require('./argParser.js');
const cmdLoader = require('./cmdLoader.js');

class commandHandler {
    constructor(client, cmdPass) {
        this.client = client;
        this.statTracker = cmdPass.statTracker;

        this.commands = { };
        this.helpTexts = { };
        this.executedCmds = new Map();

        this.loadCommands(cmdPass);
    }

    /*
        RUN
    */
    async run(msg, commandName, args) {
        return new Promise(async (resolve, reject) => {
            try {
                let cmd = this.getCommand(commandName.toLowerCase());
                let parsedArgs = (args) ? await argParser.parse(args, cmd.args, cmd.ignoreMin) : null;

                // Check if we can send messages in the channel
                if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) {
                    try {
                        await msg.author.send(new Discord.RichEmbed()
                        .setColor('RED')
                        .setDescription('It seems like I can\'t send messages in that channel!'));

                        return resolve();
                    } catch (err) {
                        console.error(`Tried to send a DM about not being able to deliver message to the specified channel but sending the DM failed! ${err}`);
                        
                        return resolve();
                    }
                }

                try {
                    // Check if all permissions
                    cmd.checkFlags(msg);

                    await cmd.run(this.client, msg, parsedArgs);

                    // Commands run +1
                    this.statTracker.commandsAdd();
                    cmd.executionSuccess(msg);

                    return resolve();
                }
                catch (err) {
                    cmd.sendBasicError(msg, err); // 'Not enough permissions to run this command!')
                    return resolve();
                }
            } catch (err) {
                // Pass error to onMessageEvent handler
                reject(err);
            }
        });
    }

    /*
        LOADING
    */
    async loadCommands(cmdPass) {
        return new Promise(async resolve => {
            let ret = await cmdLoader.load(cmdPass);
            
            this.commands = ret.commands;
            this.helpTexts = ret.helpTexts;
            resolve();
        });
    }

    async reloadCommands() {
        return new Promise(async resolve => {
            this.commands = { };
            this.helpTexts = { };
    
            await loadCommands();
            resolve();
        });
    }

    /*
        HELP
    */
    getCommand(name) {
        if (this.commands.hasOwnProperty(name)) {
            return this.commands[name];
        } else {
            throw "Command doesn't exist!";
        }
    }

    getCommandHelp(name) {
        let keys = this.helpTexts.keys();
        for (let i = 0; i < keys.length; i++) {
            let mod = Keys[i];
            if (this.helpTexts[mod].hasOwnProperty(name)) {
                return this.helpTexts[mod][name];
            }
        }
        throw "Command doesn't exist!";
    }

    getAllHelp() {
        let keys = this.helpTexts.keys();
        let ret = { };
        for (let i = 0; i < keys.length; i++) {
            let jkeys = this.helpTexts[keys[i]].keys();
            for (let j = 0; j < jkeys.length; j++) {
                ret[jkeys[j]] = this.helpTexts[keys[i]][jkeys[j]]; 
            }
        }
        return ret;
    }
}
module.exports = commandHandler;