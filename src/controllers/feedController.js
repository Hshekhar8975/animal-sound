const fs = require('fs');
const config = require("../../config");
class FeedController {
    constructor() {

    }

    getFeed() {
        return new Promise((resolve, reject) => {
            var rhymes = [];
            var testFolder = "src/controllers/assets/rhymes";

            try {
                fs.readdirSync(testFolder).forEach((file, index) => {
                    // console.log(file);
                    file = file.substring(0, file.indexOf('.'));
                    var temp = {};

                    temp.id = index.toString();
                    temp.stream = {
                        "url": config.backendUrl + "?name=" + file,
                        "format": "mp3"
                    };
                    temp.title = file;
                    temp.artist = file;

                    file = file.trim().replace(/ /gi, '-');
                    temp.albumArtUrl = config.backendUrl + "/image/?name=" + file + ".png";

                    rhymes.push(temp);
                });
            } catch (err) {
                reject(err);
            }
            resolve(rhymes)
        })
    }
}

module.exports = new FeedController();