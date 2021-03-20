import React, { useState, useEffect } from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';
import { fillShipsCoordinates } from './renderCoordinates.helpers';
import { size } from './constants/constants';

const App = () => {
  const [mapa, setMapa] = useState(new Array(size * size).fill(0));
  let tempArray = new Array(size * size).fill(0);

  const shipArray = [
    {
      name: 'destroyer',
      size: 2,
      class: 'red',
      coordinates: []
    },
    {
      name: 'destroyer',
      size: 2,
      class: 'red',
      coordinates: []
    },
    {
      name: 'submarine',
      size: 3,
      class: 'purple',
      coordinates: []
    },
    {
      name: 'cruiser',
      size: 3,
      class: 'purple',
      coordinates: []
    },
    {
      name: 'battleship',
      size: 4,
      class: 'green',
      coordinates: []
    },
    {
      name: 'carrier',
      size: 5,
      class: 'yellow',
      coordinates: []
    },
  ]

  useEffect(() => {
    generateShips();
  }, [])

  const generateMap = () => {
    return mapa.map((color, index) => <Square style={{ backgroundColor: color }} key={index} /> )
  }

  const generateShips = () => {
    fillShipsCoordinates(shipArray);

    shipArray.forEach((ship) => ship.coordinates.forEach(coordinates => {
      tempArray[coordinates] = ship.class;
    }))

    setMapa(tempArray);
  }

  const regenerate = () => {
    setMapa(tempArray);
  }

  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
        <BoardGrid size="600px">
          { generateMap() }
        </BoardGrid>
        <div className="buttons-container">
          <button onClick={regenerate} className="regenerate-btn">Regenerate</button>
          <button className="find-new-game">Find New Game</button>
        </div>
      </div>
    </Container>
  )
}

export default App
