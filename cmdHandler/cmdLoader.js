const fsUtils = require('../utils/fsUtil.js');
const fs = require('fs');
const path = require('path');
const async = require('async');

class Loader {
    static load() {
        return new Promise(async resolve => {
            // Full commands
            let moduleHelpTexts = {};
            let commandRet = {};

            // Get current modules
            let modules = await fsUtils.getFolders('./modules/');
            async.each(modules, (modulePath, callback) => {
                moduleHelpTexts[modulePath] = {};

                fsUtils.getFiles(`./modules/${modulePath}/`)
                .then(commands => {
                    async.each(commands, (cmdPath, cb) => {

                        // Blocks, explore async options
                        let commandObj = require(path.join(process.cwd(), 'modules', modulePath, cmdPath));
                        let command = new commandObj();

                        /* Insert data */
                        if (command.helpText != null) {
                            moduleHelpTexts[modulePath][command.constructor.name] = {
                                "description": command.helpText,
                                "args": command.helpArgs
                            }
                        }
                        commandRet[command.constructor.name] = command;

                        cb(null);
                    }, (innerErr) => {
                        if (innerErr)
                            throw innerErr;
                        callback(null);
                    });
                })
            }, (err) => {
                if (err)
                    throw err;
                resolve({
                    "helpTexts": moduleHelpTexts,
                    "commands": commandRet
                });
            });
        });
    }

    /* RESERVED  */
    static reload() {
        return new Promise(resolve => {
            resolve(null);
        });
    }
}
module.exports = Loader;