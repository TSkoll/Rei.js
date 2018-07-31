const Command = require('../../Types/command.js');
const request = require('request-promise-native');

const db = require('../../utils/dbUtil');

const apis = [
    'https://konachan.com/tag.json?limit=0',
    'https://yande.re/tag.json?limit=0'
]

class Buildhentai extends Command {
    constructor() {
        super({
            ownerOnly: true,
            args: 2
        });
    }

    async run(bot, msg, args) {
        await Promise.all([
            buildKona(),
            buildYande()
        ]);

        await super.sendBasicSuccess(msg, 'Successfully built hentai tag table!');
    }
}
module.exports = Buildhentai;

async function buildKona() {
    try {
        let data = await request.get(apis[0]);
        data = JSON.parse(data);

        let query = 'INSERT INTO hentaitags (tagname, serviceid) VALUES '

        for (let i = 0; i < data.length; i++) {
            const d = data[i];
    
            if (!d.ambigious && !d.name.includes('"'))
                query += `("${d.name}", 0),`
        }

        // replace last , with ;
        query = query.slice(0, -1) + ';';

        db.query(query);
    }
    catch(ex) {
        console.log(ex);
    }
}

async function buildYande() {
    try {
        let data = await request.get(apis[1]);
        data = JSON.parse(data);

        let query = 'INSERT INTO hentaitags (tagname, serviceid) VALUES '

        for (let i = 0; i < data.length; i++) {
            const d = data[i];
    
            if (!d.ambigious && !d.name.includes('"'))
                query += `("${d.name}", 1),`
        }

        // replace last , with ;
        query = query.slice(0, -1) + ';';

        db.query(query);
    }
    catch(ex) {
        console.log(ex);
    }
}