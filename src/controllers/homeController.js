var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    stream = require('stream');
const config = require("../../config");


class Controller {
    constructor() {
        path = "/app/assets";
    }
    getData(req, res) {
        if (req.query.name != undefined) {
            if (req.query.name.includes(".mp4")) {

                const path = __dirname + "/assets/videos/" + req.query.name;
                // const path =  this.path +"/videos/" + req.query.name;
                const stat = fs.statSync(path);
                const fileSize = stat.size;
                const range = req.headers.range;
                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunksize = (end - start) + 1;
                    const file = fs.createReadStream(path, { start, end });
                    const head = {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4',
                    };
                    res.writeHead(206, head);
                    file.pipe(res);
                } else {
                    const head = {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                    };
                    res.writeHead(200, head);
                    fs.createReadStream(path).pipe(res);
                }
            }
            else {
                var filePath = __dirname + "/assets/rhymes/" + req.query.name + ".mp3";
                // console.log("DIR: " + __dirname);
                // var filePath = "app/assets/rhymes/" + req.query.name + ".mp3";
                // console.log(filePath)
                var stat = fs.statSync(filePath);

                var queryData = url.parse(req.url, true).query;
                const skip = typeof (queryData.skip) == 'undefined' ? 0 : queryData.skip;
                const startByte = stat.size * skip;

                res.writeHead(200, {
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': stat.size - startByte
                });

                // We replaced all the event handlers with a simple call to util.pump()
                fs.createReadStream(filePath, { start: startByte }).pipe(res);
            }
        }
        else {
            var rhymes = [];
            var testFolder = "src/controller/assets/rhymes";

            fs.readdirSync(testFolder).forEach(file => {
                // console.log(file);
                file = file.substring(0, file.indexOf('.'));

                rhymes.push(file);
            });

            req.query.name = rhymes[Math.floor(Math.random() * 7)];
            this.getData(req, res);
        }

    }
}

module.exports = new Controller();
