const fs = require('fs');

module.exports = function(id) {
    return new Promise((resolve, reject) => {
        fs.unlink('./data/tagImages/' + id, err => {
            if(err)
                return reject(err);

            return resolve();
        })
    });
}