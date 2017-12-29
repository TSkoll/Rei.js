const Discord = require('discord.js');

const argParser = require('./argParser.js');
const cmdLoader = require('./cmdLoader.js');

class commandHandler {
    constructor(client, statTracker) {
        this.client = client;
        this.statTracker = statTracker;

        this.commands = { };
        this.helpTexts = { };

        this.loadCommands();
    }

    /*
        RUN
    */
    async run(msg, commandName, args) {
        return new Promise(async (resolve, reject) => {
            try {
                let cmd = this.getCommand(commandName.toLowerCase());
                let parsedArgs = (args) ? await argParser.parse(args, cmd.args) : null;

                // Check if all permissions 
                if (cmd.checkFlags(msg)) {
                    await cmd.run(this.client, msg, parsedArgs);

                    // Commands run +1
                    this.statTracker.commandsAdd();

                    resolve();
                }
                else {
                    cmd.sendBasicError(msg, 'Not enough permissions to run this command!')
                    resolve();
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
    async loadCommands() {
        return new Promise(async resolve => {
            let ret = await cmdLoader.load(this.statTracker);
            
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