const Discord = require('discord.js');

const argParser = require('./argParser.js');
const cmdLoader = require('./cmdLoader.js');

class commandHandler {
    constructor(client, cmdPass) {
        this.client = client;
        this.statTracker = cmdPass.statTracker;

        this.commands = { };

        this.loadCommands(cmdPass);
    }

    /*
        RUN
    */
    async run(msg, cmdName, args) {
        try {
           // Get command and group arguments
            const cmd = this.getCommand(cmdName.toLowerCase());
            const parsedArgs = (args) ? argParser.parse(args, cmd.args, cmd.ignoreMin) : null;

            if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) {
                try {
                    await msg.author.send(new Discord.RichEmbed()
                    .setColor('RED')
                    .setDescription('It seems like I can\'t send messages in that channel!'));

                    return;
                } catch (err) {
                    console.error(`Tried to send a DM about not being able to deliver message to the specified channel but sending the DM failed! ${err}`);
                
                    return;
                }
            }

            try {
                // Check if all permissions
                cmd.checkFlags(msg);
            
                await cmd.run(this.client, msg, parsedArgs);
            
                // Commands run +1
                this.statTracker.commandsAdd();
                cmd.executionSuccess(msg);
            
                return;
            }
            catch (err) {
                await cmd.sendBasicError(msg, err); // 'Not enough permissions to run this command!')

                return;
            }
        } catch (err) {
            if (err != "Command doesn't exist!")
                throw err;
        }
   }

    /*
        LOADING
    */
    async loadCommands(cmdPass) {
        let ret = await cmdLoader.load(cmdPass);
        
        this.commands = ret;
        return;
    }

    async reloadCommands() {
        this.commands = { };

        await loadCommands();
        return;
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
}
module.exports = commandHandler;