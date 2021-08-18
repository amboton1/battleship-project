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

/* 
 user se spoji na API, traži ID iz baze
 - aplikacija provjerava da li je već upisan neki ID
 - ako ima ID u bazi, učitava taj ID, briše ga iz baze, vraća ID u response respond.end(`{ status: 'active', ID: ${ID} }`);
  -ako ne postoji nijedan ID u bazi, upiši svoj ID u bazu, u response body vrati neki status "waiting", ili tako nekako respond.end("{ status: 'waiting' }");

  client:
    const result = repsonse(r => JSON.parse(r)) - pseudo kod

swtich(result.status) {
    case 'active':
        setGameStatus({ wating: false, active: true})
        setOponnentID(result.ID);
        break;
}   case 'waiting':
        setGamesStatus({ waiting: true, active: false})
        break;
    usEffect(() => {
        if (gameStatus.active) {
                // setup peer connection
                let conn = peer.connect(result.ID);
                console.log('connection', conn)
        }
        if(gameStatus.waiting) {
            peer.on('connection', function(conn) { console.log(conn) });
        }
    }, [gameStatus]);
    
 */
app.post('/receive', (request, respond) => {
    const filePath = __dirname + '/public/userId.txt';
    let id = '';

    request.on('data', (data) => {
        id += data;
    });

    // check if file exists
    fs.appendFileSync(filePath, '');

    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        if (data.length === 0) {
            // ako ne postoji ništa, upiši ID u file i vrati response waiting
            fs.appendFile(filePath, id, () => {
                respond.end(`{ status: 'waiting', ID: ${id} }`);
            });
        } else {
            // ako postoji, onda učitaj, izbriši iz fajla i vrati success + id
            fs.writeFile(filePath, '', () => {
                // respond.end();
            });
            respond.end(`{ status: 'success', ID: ${data} }`);
        }
    })
});

server.listen(port, () => {
    console.log('Listening on: ' + port);
});