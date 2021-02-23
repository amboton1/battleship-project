import React, { useState } from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';
import { shipArray } from './renderCoordinates.helpers';
import { size } from './constants/constants';

const App = () => {
  const [mapa, setMapa] = useState(new Array(size * size).fill(0));

  const fillMapWithCoordinates = () => {
    shipArray.forEach((ship) => ship.coordinates.forEach(coordIndex => {
      mapa[coordIndex] = ship.class
    }))
  }
  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
        <BoardGrid size="600px">
          {fillMapWithCoordinates()}
          { mapa.map((color, index) => <Square style={{ backgroundColor: color }} key={index} /> ) }
        </BoardGrid>
      </div>
    </Container>
  )
}

export default App
