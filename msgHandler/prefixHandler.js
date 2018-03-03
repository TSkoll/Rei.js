const db = require('../utils/dbUtil.js');
const defaultPrefix = require('../data/config.json').defaultPrefix;

class prefixHandler {
    constructor() {
        this.prefixes = new Map();
    }

    async get(id) {
        // If we already have the prefix cached, return it instead of hitting the db
        if (this.prefixes.has(id))
            return this.prefixes.get(id);
        else {
            // Doesn't exist, get from the database
            if (await db.ifRowExists('prefixes', { guild: id })) {
                const rows = await db.getRows('prefixes', { guild: id });
                const prefix = rows[0].prefix;


                // Update cache
                this.prefixes.set(id, prefix);
                
                return prefix;
            } else {
                // The db didn't contain a prefix, set cache to default
                this.prefixes.set(id, defaultPrefix);

                return defaultPrefix;
            }
        }
    }

    async set(id, prefix) {
        if (prefix == null)
            prefix = defaultPrefix;

        if (prefix == this.prefixes.get(id))
            throw 'The server already has this prefix!';

        this.prefixes.set(id, prefix);

        // If DB already contains information, update it
        // Otherwise insert data
        if (await db.ifRowExists('prefixes', { guild: id })) {
            await db.updateRow('prefixes', { guild: id }, { prefix : prefix });
        } else {
            await db.addData('prefixes', {
                guild: id,
                prefix: prefix
            });
        }
    }
}
module.exports = prefixHandler;