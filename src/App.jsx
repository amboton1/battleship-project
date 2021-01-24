import React from 'react';
import './App.css';
import { Container,  BoardGrid, ColumnLabels, RowLabels, Square } from './2DArray.styled';
import { shipArray } from './shipsArray';

const App = () => {
  const boardRows = 'A B C D E F G H I J'.split(' ');
  const boardColumns = '1 2 3 4 5 6 7 8 9 10'.split(' ');

  const renderGridSystem = () => {
    let square = [];

    for (let i = 0; i < 100; i++) {
      square.push(<Square key={i} />)
    }

    return (
      <BoardGrid size="500px">
        <div></div> 
        <ColumnLabels>{boardColumns.map(number => <Square key={number}>{number}</Square>)}</ColumnLabels>
        <RowLabels>{boardRows.map(letter => <Square key={letter}>{letter}</Square>)}</RowLabels>
        {square}
      </BoardGrid>
    )
  }

  return (
    <Container>
      <h1>Battlefield Game</h1>
      <div className="grid-display">
        <div className="player-1">{renderGridSystem()}</div>
        <div className="game-info">
          <button id="start">New Game</button>
          <button id="reset">Reset Game</button>
        </div>
        <div className="player-2">{renderGridSystem()}</div>
      </div>
    </Container>
  )
}

export default App
