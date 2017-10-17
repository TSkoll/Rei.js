const fs = require('fs');
const path = require('path');

class fsUtil {
    // Async folder get
    static getFolders(path) {
        fs.readdir(path, (err, files) => {
            if (err)
                throw err;
            
            let dirs = [];
            let lasterr = false;
            files.filter(file => {
                fs.stat(path.join(process.cwd(), path, file), (err, stats) => {
                    if (err) {
                        console.error(err);
                        if (lasterr)
                            throw "Multiple errors, check previus log points";
                        lasterr = true;
                    }

                    if (stats.isDirectory()) {
                        dirs.push(file);
                        lasterr = false;
                    }
                })
                .then(() => {
                    return dirs;
                });
            });
        });
    }
}
module.exports = fsUtil;