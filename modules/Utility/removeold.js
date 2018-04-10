const Command = require('../../Types/command.js');
const validator = require('validator');
const async = require('async')

class Removeold extends Command {
    constructor() {
        super({
            args: 0,
            userPerms: ['MANAGE_GUILD'],
            botPerms: ['MANAGE_ROLES'],
            disallowDM: true
        });
    }

    async run(bot, msg, args) {
        const guild = msg.guild;
        const roles = guild.roles.array();

        let amount = 0;
        async.each(roles, async (r, cb) => {
            if (r.name[0] == "#") {
                if (validator.isHexColor(r.name)) {
                    if (r.members.size == 0) {
                        await r.delete();
                        amount++;
                    }
                }
            }
        }, (err) => {
            if (err) {
                super.sendBasicError(msg, err);
                return;
            }

            super.sendBasicSuccess(msg, `Removed ${amount} color roles (and hopefully nothing else)!`)
        });
    }
}
module.exports = Removeold;