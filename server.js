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

app.post('/receive', (request, respond) => {
    var body = '';
    const filePath = __dirname + '/public/userId.txt';
    let fileContent = '';

    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return;
        }
        fileContent = data;
    })

    request.on('data', (data) => {
        body += data;
    });

    request.on('end', () => {
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
});

server.listen(port, () => {
    console.log('Listening on: ' + port);
});