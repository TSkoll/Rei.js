const Command = require("../../Types/command.js");
const set = require("./quote/subcommands/set.js");
const remove = require("./quote/subcommands/remove.js");
const list = require("./quote/subcommands/list.js");
const quoteByID = require("./quote/subcommands/quoteByID.js");
const quoteByName = require("./quote/subcommands/quoteByName.js");

class Quote extends Command {
    constructor() {
        super({
            args: 3,
            ignoreMin: true,
            disallowDM: true
        });
    }

    async run(bot, msg, args) {
        if (args.length < 1) throw "Not enough arguments!";

        switch (args[0]) {
            case "set":
                await set(msg, args);
                await this.sendBasicSuccess(msg, "Quote saved!");

                break;
            case "remove":
                await remove(msg, args);
                await this.sendBasicSuccess(msg, "Quote removed!");

                break;
            case "list":
                await list(msg, args);
                break;
            default:
                // If we're just getting numbers, assume that pulling by id is wanted, if else check if we have something saved.
                if (!isNaN(args[0])) await quoteByID(msg, args);
                else await quoteByName(msg, args);
                break;
        }
    }
}

module.exports = Quote;
