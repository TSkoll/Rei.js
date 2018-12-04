const Command = require('../../Types/command.js');

const set = require('./tag/set.js');
const remove = require('./tag/remove.js');
const list = require('./tag/list.js');
const tag = require('./tag/tag.js');

class Tag extends Command {
    constructor(cmdPass) {
        super({
            args: 3,
            ignoreMin: true
        });

        this.webApiKey = cmdPass.webApiKey;
    }

    async run(bot, msg, args) {
        if (args.length < 1)
            throw 'Not enough arguments!';

        switch (args[0]) {
            case 'create':
                await set(msg, args, this.webApiKey);
                await super.sendBasicSuccess(msg, 'Tag created!');

                break;
            case 'delete':
                await remove(msg, args, this.webApiKey);
                await super.sendBasicSuccess(msg, 'Tag deleted!');

                break;
            case 'list':
                await list(msg, args, this.webApiKey);
                break;
            default:
                await tag(msg, args, this.webApiKey);
                break;
        }
    }
}
module.exports = Tag;