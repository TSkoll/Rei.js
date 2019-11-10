const defaultPrefix = require('../data/config.json').defaultPrefix;

// TODO: add MongoDB Support
class prefixHandler {
    constructor() {
        this.prefixes = new Map();
    }

    async get(id, db) {
        if (this.prefixes.has(id)) {
            const prefix = this.prefixes.get(id);
            return (prefix) ? prefix : defaultPrefix;
        } else {
            const prefixCol = db.collection('prefixes');

            const data = await prefixCol.findOne({ guild: id });
            if (data && data.prefix) {
                this.prefixes.set(id, data.prefix);

                return data.prefix;
            } else {
                this.prefixes.set(id, defaultPrefix);

                return defaultPrefix;
            }
        }
    }

    async set(id, prefix, db) {
        if (prefix == null)
            prefix == defaultPrefix;

        if (prefix == this.prefixes.get(id))
            throw 'The server already has this prefix!';

        this.prefixes.set(id, prefix);

        const prefixCol = db.collection('prefixes');
        prefixCol.updateOne({ guild: id }, { $set: { guild: id, prefix: prefix } }, { upsert: true });
    }
}
module.exports = prefixHandler;