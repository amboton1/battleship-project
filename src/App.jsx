import React, { useState, useEffect } from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';
import { fillShipsCoordinates } from './renderCoordinates.helpers';
import { size, statuses } from './constants/constants';
import Peer from 'peerjs';

const App = () => {
  const [mapa, setMapa] = useState(new Array(size * size).fill(0));
  const [opponentsMap, setOpponentsMap] = useState(new Array(size * size).fill());
  let tempArray = new Array(size * size).fill(0);
  
  // kreiraj peer objekt
  let peer = null;

  useEffect(() => {
    generateShips();
  }, []);

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
    console.log('CONN: ', connection);

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
    return mapa.map((number, index) => number
      ? <Square style={{ fontWeight: 'bold' }} key={index}>{number}</Square>
      : <Square key={index}>0</Square>
    )
  }

  const generateOpponentsGrid = () => opponentsMap.map((square, index) => <Square key={index}>{square}</Square>)

  const generateShips = () => {
    const ships = fillShipsCoordinates();

    ships.forEach((ship) => ship.coordinates.forEach(coordinates => {
      tempArray[coordinates] = 1;
    }))

    setMapa(tempArray);
  }

  const findNewGame = () => {
    peer = new Peer();

    return peer.on('open', async () => {
      // send peer id, todo: promjeniti u get
      const status = await fetchStatus(peer);
      const statusObject = await status.json();
      const game = retreiveGameStatus(statusObject.status);

      settingPeerConnection(game);
    });
  }

  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
        <BoardGrid size="600px">
          {generateGrid()}
        </BoardGrid>
        <div className="buttons-grid-container">
          <button onClick={generateShips} className="regenerate-btn">Regenerate</button>
          <button onClick={findNewGame} className="find-new-game">Find New Game</button>
          <h2>OPPONENTS GRID</h2>
          <BoardGrid size="300px">
            {generateOpponentsGrid()}
          </BoardGrid>
        </div>
      </div>
    </Container>
  )
}

export default App
