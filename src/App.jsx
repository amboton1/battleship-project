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

  useEffect(() => {
    generateShips();

    let peer = new Peer('testId', {
      host: window.location.hostname,
      port: window.location.port || (window.location.protocol === 'https:' ? 443 : 80),
      path: '/peerjs'
    });

     axios.post(`http://localhost:8000/receive`, peer.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }, [])

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
