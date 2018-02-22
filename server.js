const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    spdy = require('spdy'),
    http = require('http'),
    app = express();

let cache = {};

app.set('etag', false);

app.use(express.static('./'));

http.createServer(app).listen(3000, () => {
    return console.log(`HTTP/1 use http://localhost:3000`);
});

spdy
    .createServer(
        {
            key: fs.readFileSync(path.join(__dirname, 'http2-keys/server.key')),
            cert: fs.readFileSync(path.join(__dirname, 'http2-keys/server.crt')),
            spdy: { protocols: ['h2', 'http/1.1', 'http/1.0'] }
        },
        app
    )
    .listen(3001, err => {
        if (err) {
            throw new Error(err);
        }
        console.log(`
HTTP/2 use https://localhost:3001`);
    });
