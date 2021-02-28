import React, { useState, useEffect } from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';
import { fillShipsCoordinates } from './renderCoordinates.helpers';
import { shipArray, size } from './constants/constants';

const App = () => {
  const [mapa, setMapa] = useState(new Array(size * size).fill(null));
  const tempArray = new Array(size * size).fill(null);

  useEffect(() => {
    fillShipsCoordinates(shipArray);
  }, [])

  useEffect(() => {
    shipArray.forEach((ship) => ship.coordinates.forEach(coordinates => {
      tempArray[coordinates] = ship.class;
    }))

    setMapa(tempArray);
  }, [])

  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
        <BoardGrid size="600px">
          { mapa.map((color, index) => <Square style={{ backgroundColor: color }} key={index} /> ) }
        </BoardGrid>
      </div>
    </Container>
  )
}

export default App
