const http = require('http');
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port);

server.on('listening', () => {
    console.log(`Listening to port ${port}...`);
});

server.on('error', err => {
    console.log("Error:", err);
});