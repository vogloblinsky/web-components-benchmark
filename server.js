const express = require('express'),
    http = require('http'),
    app = express();

app.set('etag', false);

app.use(express.static('./'));

http.createServer(app).listen(3000, () => {
    return console.log(`HTTP/1 use http://localhost:3000`);
});