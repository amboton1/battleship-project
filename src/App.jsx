import React from 'react';
import './App.css';
import { Container,  BoardGrid, Square } from './2DArray.styled';

const App = () => {

  const mapa = new Array(100).fill(0);

  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
      <BoardGrid size="600px">
        { mapa.map(kocka => <Square>{kocka}</Square>) }
      </BoardGrid>
      </div>
    </Container>
  )
}

export default App
