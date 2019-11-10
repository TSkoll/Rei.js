const fs = require('fs'); 
const Path = require('path'); 
const async = require('async'); 
 
class fsUtil { 
    // Async folder get 
    static getFolders(folderPath) { 
        return new Promise(resolve => { 
            let retDirs = []; 
             
            // Reads all files in a directory 
            fs.readdir(folderPath, (err, files) => { 
                if (err) 
                    throw err; 
 
                async.each(files, (file, callback) => { 
                    // Push only directories to return 
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
                        // Push files only to return 
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
 
    static readFile(path) { 
        return new Promise((resolve, reject) => { 
            fs.readFile(path, (err, data) => { 
                if (err)  
                    reject(err); 
                else 
                    resolve(data); 
            }) 
        }); 
    } 
 
    static unlink(path) { 
        return new Promise((resolve, reject) => { 
            fs.unlink(path, err => { 
                if (err) 
                    reject(err); 
                else 
                    resolve(); 
            }); 
        }); 
    } 
 
    static writeFile(path, data, options) { 
        return new Promise((resolve, reject) => { 
            fs.writeFile(path, data, options, err => { 
                if (err) 
                    reject(err); 
                else 
                    resolve(); 
            }); 
        }) 
    } 
} 
module.exports = fsUtil; 
