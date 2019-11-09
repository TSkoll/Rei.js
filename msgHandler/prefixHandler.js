const defaultPrefix = require('../data/config.json').defaultPrefix;

// TODO: add MongoDB Support
class prefixHandler {
    constructor() {
        this.prefixes = new Map();
    }

    async get(id) {
        return defaultPrefix;
    }

    async set(id, prefix) {
        return;
    }
}
module.exports = prefixHandler;