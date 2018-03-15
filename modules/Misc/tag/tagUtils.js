const fsUtils = require("../../../utils/fsUtil.js");
const request = require("request-promise-native");

class tagUtils {
    static async deleteImage(id) {
        try {
            await fsUtils.unlink("./data/tagImages/" + id);
        } catch (err) {
            throw err;
        }
    }

    static async loadImage(id) {
        try {
            const buffer = await fsUtils.readFile("./data/tagImages/" + id);

            return buffer;
        } catch (err) {
            throw err;
        }
    }

    static async saveImage(img) {
        try {
            // Download file from the web resource, save it to disk
            const buffer = await request.get({
                url: img.url,
                encoding: "binary"
            });
            await fsUtils.writeFile(
                "./data/tagImages/" +
                    img.id +
                    img.filename.slice(img.filename.lastIndexOf(".")),
                buffer,
                { encoding: "binary" }
            );
        } catch (err) {
            throw err;
        }
    }
}
module.exports = tagUtils;
