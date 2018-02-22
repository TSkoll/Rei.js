const Command = require('../../Types/command.js');
const set = require('./quote/subcommands/set.js');
const remove = require('./quote/subcommands/remove.js');
const list = require('./quote/subcommands/list.js');
const quoteByID = require('./quote/subcommands/quoteByID.js');
const quoteByName = require('./quote/subcommands/quoteByName.js');

class Quote extends Command {
    constructor() {
        super({
            'args': 3,
            'ignoreMin': true,
            'disallowDM': true
        });
    }

    async run(bot, msg, args) {
        //User has to pass at least one argument
        if(args.length < 1)
            throw 'Not enough arguments';

        //Check if any of the arguments contains non-alphanumeric character
        if( /[^\w ]/.test(args[0]) ||
            (args[1] ? /[^\w ]/.test(args[1]) : false) ||
            (args[2] ? /[^\w ]/.test(args[2]) : false))
            throw 'Quote names have to be alphanumeric'

        if(args[0] == 'set') {
            await set(msg, args);

            //Inform the user about the success
            await this.sendBasicSuccess(msg, 'Quote saved!');
        } else if(args[0] == 'remove') {
            await remove(msg, args);

            //Inform the user about the success
            await this.sendBasicSuccess(msg, 'Quote removed!');
        } else if(args[0] == 'list') 
            await list(msg, args);
        else if(!isNaN(args[0]))
            await quoteByID(msg, args);
        else
            await quoteByName(msg, args);
    }
}

module.exports = Quote;