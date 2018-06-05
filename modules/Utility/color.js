const Command = require('../../Types/command.js');
const c = require('./color/avatar.js');

const avatar = require('./color/avatar.js');
const hex = require('./color/hex.js');
const random = require('./color/random.js');
const remove = require('./color/remove.js');
const history = require('./color/history.js');

let menusOpen = [];

class Color extends Command {
    constructor() {
        super({
            args: 1,
            disallowDM: true,
            aliases: [ 'colorme' ],
            rateLimit: 15000 // 15 second cooldown
        });
    }

    async run(bot, msg, args) {
        if (menusOpen.includes(msg.author.id))
            throw 'You can\'t use this command while you have a color menu open!';

        // Possible choices
        try { 
            switch (args) {
                case 'avatar':
                    await avatar(msg, menusOpen);
                    menusOpen.push(msg.author.id);
                    break;
                case 'random':
                    await random(msg, menusOpen);
                    menusOpen.push(msg.author.id);
                    break;
                case 'remove':
                case 'clear':
                    await remove(msg);
                    await super.sendBasicSuccess(msg, "Color removed!");
                    break;
                case 'history':
                    await history(msg);
                    break;
                default:
                    await hex(msg, args);
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
module.exports = Color;