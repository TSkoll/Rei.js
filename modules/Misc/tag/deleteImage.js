const fs = require('fs');

modules.exports = (id) => {
    return new Promise((resolve, reject) => {
        fs.unlink('./data/tagImages/' + id, err => {
            if(err)
                return reject(err);

            return resolve();
        })
    });
}