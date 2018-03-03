const fs = require('fs');
const request = require('request-promise-native');

class tagUtils {
    static async deleteImage(id) {
        try {
            await fs.unlink('./data/tagImages/' + id);
        } catch (err) {
            throw err;
        }
    }

    static async loadImage(id) {
        try {
            const buffer = await fs.readFile('./data/tagImages' + id);

            return buffer;
        } catch (err) {
            throw err;
        }
    }

    static async saveImage(img) {
        try {
            // Download file from the web resource, save it to disk
            const buffer = await request.get({url: img.url, encoding: 'binary'});
            await fs.writeFile('./data/tagImages/' + img.id + img.filename.splice(img.filename.lastIndexOf('.')));
        } catch (err) {
            throw err;
        }
    }
}
module.exports = tagUtils;