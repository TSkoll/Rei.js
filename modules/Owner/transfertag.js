const Command = require('../../Types/command.js');
const Discord = require('discord.js');
const db = require('../../utils/dbUtil.js');
const fs = require('fs');
const request = require('request-promise-native');

class Transfertag extends Command {
    constructor(cmdPass) {
        super({
            args: 1,
            ownerOnly: true
        });

        this.webApiKey = cmdPass.webApiKey;
    }

    async run(msg, args, bot) {
        const rows = await db.query('SELECT * FROM tags;')


        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            let form = {
                k: this.webApiKey,
                u: row.userid,
                tagName: row.name
            }

            if (row.content)
                form.tagContent = row.content;

            if (row.imageid)
                form.fileContent = fs.createReadStream('../../data/tagImages/' + row.imageid);

            try {
                const resp = await request.post('http://reibot.xyz/tag/upload?k=' + this.webApiKey, {formData: form});

                if (resp == "OK")
                    return;
                else
                    throw resp;
            } catch (err) {
                throw err;
            }
        }
    }
}
module.exports = Transfertag;