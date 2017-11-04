const Discord = require('discord.js');

const argParser = require('./argParser.js');
const cmdLoader = require('./cmdLoader.js');

class commandHandler {
    constructor() {
        this.commands = { };
        this.helpTexts = { };
    }

    static async loadCommands() {
        return new Promise(resolve => {
            let ret = await cmdLoader.load();
            
            this.commands = ret.commands;
            this.helpTexts = ret.helpTexts;
            resolve();
        });
    }

    static async reloadCommands() {
        return new Promise(resolve => {
            this.commands = { };
            this.helpTexts = { };
    
            await loadCommands();
            resolve();
        });
    }

    static getCommand(name) {
        if (this.commands.hasOwnProperty(name)) {
            return this.commands[name];
        } else {
            throw "Command doesn't exist!";
        }
    }

    static getCommandHelp(name) {
        let keys = this.helpTexts.keys();
        for (let i = 0; i < keys.length; i++) {
            let mod = Keys[i];
            if (this.helpTexts[mod].hasOwnProperty(name)) {
                return this.helpTexts[mod][name];
            }
        }
        throw "Command doesn't exist!";
    }

    static getAllHelp() {
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