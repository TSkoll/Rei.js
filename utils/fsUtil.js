const fs = require('fs');
const Path = require('path');
const async = require('async');

class fsUtil {
    // Async folder get
    static getFolders(folderPath) {
        return new Promise(resolve => {
            let retDirs = [];
            fs.readdir(folderPath, (err, files) => {
                if (err)
                    throw err;

                async.each(files, (file, callback) => {
                    fs.stat(Path.join(process.cwd(), folderPath, file), (err, stat) => {
                        if (stat.isDirectory()) {
                            retDirs.push(file);
                        }
                        callback(null);
                    });
                }, (err) => {
                    if (err)
                        throw err;

                    resolve(retDirs);
                });
            });
        });
    }

    // Async file get
    static getFiles(folderPath) {
        return new Promise(resolve => {
            let retFiles = [];
            fs.readdir(folderPath, (err, files) => {
                async.each(files, (file, callback) => {
                    fs.stat(Path.join(process.cwd(), folderPath, file), (err, stat) => {
                        if (!stat.isDirectory()) {
                            retFiles.push(file);
                        }
                        callback(null);
                    });
                }, (err) => {
                    if (err)
                        throw err;
                    resolve(retFiles);
                })
            });
        });
    }
}
module.exports = fsUtil;