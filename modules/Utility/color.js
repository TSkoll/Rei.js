const Command = require('../../Types/command.js');
const c = require('./color/avatar.js');

const avatar = require('./color/avatar.js');
const hex = require('./color/hex.js');
const random = require('./color/random.js');
const remove = require('./color/remove.js');

let menusOpen = [];

class Color extends Command {
    constructor() {
        super({
            args: 1,
            rateLimit: 15000 // 15 second cooldown
        });
    }

    async run(bot, msg, args) {
        if (menusOpen.includes(msg.author.id))
            return;
        else
            menusOpen.push(msg.author.id);

        // Possible choices
        try { 
            switch (args) {
                case 'avatar':
                    await avatar(msg, menusOpen);
                    break;
                case 'random':
                    await random(msg, menusOpen);
                    break;
                case null:
                    await remove(msg);
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