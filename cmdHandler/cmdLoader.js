const fsUtils = require('../utils/fsUtil.js');
const fs = require('fs');
const path = require('path');
const async = require('async');

class Loader {
    /* Loads commands and builds the commands and help object */
    static load(statTracker) {
        return new Promise(async resolve => {
            // Full commands, returnable lists
            let moduleHelpTexts = {};
            let commandRet = {};

            // Get current modules
            let modules = await fsUtils.getFolders('./modules/');
            
            // Loop through found modules
            async.each(modules, (modulePath, callback) => {
                // Create an object for each module
                moduleHelpTexts[modulePath] = {};

                // Find commands inside modules
                fsUtils.getFiles(`./modules/${modulePath}/`)
                .then(commands => {
                    // Loop through found commands
                    async.each(commands, (cmdPath, cb) => {

                        /* Require the found command file (e.g. modules/owner/setName.js)
                        Blocks, explore async options */
                        let commandObj = require(path.join(process.cwd(), 'modules', modulePath, cmdPath));

                        // Pass stat tracker to commands
                        let command = new commandObj(statTracker);

                        /* Insert data */
                        if (command.helpText != null) {
                            // Insert help data of the command to the helptext object.
                            moduleHelpTexts[modulePath][command.constructor.name] = {
                                "description": command.helpText,
                                "args": command.helpArgs
                            }
                        }
                        // Add the command to the commands object
                        commandRet[command.constructor.name.toLowerCase()] = command;
                        
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
                
                // Return built objects
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
