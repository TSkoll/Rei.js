const Command = require('../../Types/command.js');
const c = require('./color/avatar.js');

const avatar = require('./color/avatar.js');
const assign = require('./color/assign.js');

class Color extends Command {
    constructor() {
        super({
            args: 1
        });
    }

    async run(bot, msg, args) {
        // Possible choices
        try { 
            switch (args) {
                case 'avatar':
                    const cr = await avatar(msg);
                    break;
                case null:
                    await assign(msg, 'remove');
                    break;
                default:
                    await assign(msg, args);
                    break;
            }
        } catch (err) {
            throw err;
        }
    }
}
module.exports = Color;