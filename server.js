const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || "8000";
const fs = require('fs');

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/',
    ssl: {}
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post('/receive', function(request, respond) {
    var body = '';
    const filePath = __dirname + '/public/data.txt';

    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
});

server.listen(port, () => {
    console.log('Listening on: ' + port);
});