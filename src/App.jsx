import React, { useState, useEffect } from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';
import { fillShipsCoordinates } from './renderCoordinates.helpers';
import { size, statuses } from './constants/constants';
import Peer from 'peerjs';

const App = () => {
  const [mapa, setMapa] = useState(new Array(size * size).fill(0));
  let tempArray = new Array(size * size).fill(0);
  
  // kreiraj peer objekt
  let peer = new Peer();

  useEffect(() => {
    generateShips();

    peer.on('open', async () => {
      // send peer id, todo: promjeniti u get
      const status = await fetchStatus(peer);
      const statusObject = await status.json();

      const game = retreiveGameStatus(statusObject.status);

      settingPeerConnection(game);
    });

    return () => {
      peer.destroy();
    }
  }, [])

  const fetchStatus = (peer) => {
    return fetch('http://localhost:8000/receive', { method: 'POST', body: peer.id });
  }

  const retreiveGameStatus = (status) => {
    switch (status) {
      case statuses.ACTIVE:
        return ({ waiting: false, active: true});
      case statuses.WAITING:
        return ({ waiting: true, active: false});
      default:
        break;
    }
  }

  const settingPeerConnection = (game) => {
    // setup peer connection
    let connection = peer.connect(peer.id);

    if (game?.active) {
        console.log('game status: ', game.active);
        console.log('active connection', connection)
    }

    if (game?.waiting) {
      peer.on('connection', (conn) => {
        console.log('CONNECTION:', conn);  
      });
    }
  }

  const generateGrid = () => {
    return mapa.map((color, index) => color
      ? <Square style={{ backgroundColor: color }} key={index} />
      : <Square key={index} />
    )
  }

  const generateShips = () => {
    const ships = fillShipsCoordinates();

    ships.forEach((ship) => ship.coordinates.forEach(coordinates => {
      tempArray[coordinates] = ship.class;
    }))

    setMapa(tempArray);
  }

  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
        <BoardGrid size="600px">
          {generateGrid()}
        </BoardGrid>
        <div className="buttons-container">
          <button onClick={generateShips} className="regenerate-btn">Regenerate</button>
          <button className="find-new-game">Find New Game</button>
        </div>
      </div>
    </Container>
  )
}

export default App
