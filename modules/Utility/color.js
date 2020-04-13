const Command = require('../../Types/command.js');
const c = require('./color/avatar.js');

const avatar = require('./color/avatar.js');
const hex = require('./color/hex.js');
const random = require('./color/random.js');
const remove = require('./color/remove.js');
const history = require('./color/history.js');

let menusOpen = [];

class Color extends Command {
    constructor(cmdPass) {
        super({
            args: 1,
            disallowDM: true,
            aliases: [ 'colorme' ],
            rateLimit: 5000 // 5 second cooldown
        });

        this.db = cmdPass.db;
    }

    async run(bot, msg, args) {
        if (menusOpen.includes(msg.author.id))
            throw 'You can\'t use this command while you have a color menu open!';

        if (!args) {
            super.sendBasicSuccess(msg, 'Possible submenus:\n-avatar\n-random\n-remove\n-history')
            return;
        }

        // Possible choices
        try { 
            switch (args) {
                case 'avatar':
                    await avatar(msg, menusOpen, this.db);
                    menusOpen.push(msg.author.id);
                    break;
                case 'random':
                    await random(msg, menusOpen, this.db);
                    menusOpen.push(msg.author.id);
                    break;
                case 'remove':
                case 'clear':
                    await remove(msg);
                    await super.sendBasicSuccess(msg, "Color removed!");
                    break;
                case 'history':
                    await history(msg, this.db);
                    break;
                default:
                    await hex(msg, args, this.db);
                    break;
            }
        } catch (err) {
            if (err.expected)
                await super.sendBasicError(msg, err.message);
            else
                throw err;
        }
    }
}
module.exports = {
    command: Color,
    args: [
        {
            name: "{hex code}",
            summary: "A hexadecimal color code. You can choose your favorite color from https://color.adobe.com/create/.",
            required: false
        },
        {
            name: "remove",
            summary: "Removes your existing color.",
            required: false,
            aliases: [
                "clear"
            ]
        },
        {
            name: "avatar",
            summary: "Opens a menu that'll recommend colors based on your current avatar.",
            required: false
        },
        {
            name: "history",
            summary: "Brings up a list of previous colors you've had.",
            required: false
        }
    ],
    aliases: [
        "colorme"
    ]
};