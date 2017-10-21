const fs = require('fs');
const Path = require('path');
const async = require('async');

class fsUtil {
    // Async folder get
    static async getFolders(folderPath) {
        return new Promise(resolve => {
            let dirs = [];
            fs.readdir(folderPath, (err, files) => {
                async.each(files, (file, callback) => {
                    fs.stat(Path.join(process.cwd(), folderPath, file), (err, stat) => {
                        if (stat.isDirectory()) {
                            dirs.push(file);
                        }
                    });
                    callback();
                }, (err) => {
                    throw err;
                });
            });
            resolve(dirs);
        });
    }

    // Async file get
    static async getFiles(folderPath) {
        return new Promise(resolve => {
            let retFiles = [];
            fs.readdir(folderPath, (err, files) => {
                async.each(files, (file, callback) => {
                    fs.stat(Path.join(process.cwd(), folderPath, file), (err, stat) => {
                        if (!stat.isDirectory()) {
                            retFiles.push(file);
                        }
                    });
                    callback();
                }, (err) => {
                    throw err;
                });
            });
            resolve(retFiles);
        });
    }
}
module.exports = fsUtil;