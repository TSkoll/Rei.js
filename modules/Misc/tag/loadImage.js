const fs = require('fs');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/tagImages/' + id, (err, buff) => {
            if(err)
                return reject(err);

            return resolve(buff);
        });
    });
}