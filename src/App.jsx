import React, { useState, useEffect } from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';
import { fillShipsCoordinates } from './renderCoordinates.helpers';
import { size } from './constants/constants';
import Peer from 'peerjs';
import axios from 'axios';

const App = () => {
  const [mapa, setMapa] = useState(new Array(size * size).fill(0));
  let tempArray = new Array(size * size).fill(0);
  
  // kreiraj peer objekt
  let peer = new Peer();

  useEffect(() => {
    generateShips();

    peer.on('open', () => {
      // send peer id, todo: promjeniti u get
      axios.post(`http://localhost:8000/receive`, peer.id).then(res => {
        console.log(res.data);

        const game = retreiveGameStatus(res.data.status);
        
        settingPeerConnection(game);
      })
    });

    return () => {
      peer.destroy();
    }
  }, [])

  const retreiveGameStatus = (status) => {
    switch (status) {
      case 'success':
        return ({ waiting: false, active: true});
      case 'waiting':
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
