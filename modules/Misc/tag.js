const Command = require('../../Types/command.js');

const set = require('./tag/set.js');
const remove = require('./tag/remove.js');
const list = require('./tag/list.js');
const tag = require('./tag/tag.js');
const rename = require('./tag/rename.js');

class Tag extends Command {
    constructor() {
        super({
            args: 3,
            ignoreMin: true
        });
    }

    async run(bot, msg, args) {
        if (args.length < 1)
            throw 'Not enough arguments!';

        switch (args[0]) {
            case 'create':
                await set(msg, args);
                await super.sendBasicSuccess(msg, 'Tag created!');

                break;
            case 'delete':
                await remove(msg, args);
                await super.sendBasicSuccess(msg, 'Tag deleted!');

                break;
            case 'list':
                await list(msg, args);

                break;
            case 'rename':
                await rename(msg, args);
                await super.sendBasicSuccess(msg, 'Tag renamed!');

                break;
            default:
                await tag(msg, args);
                
                break;
        }
    }
}
module.exports = Tag;