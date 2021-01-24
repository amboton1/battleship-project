import React from 'react';
import './App.css';
import { Container,  BoardGrid, ColumnLabels, RowLabels, Square } from './2DArray.styled';

const App = () => {
  const boardRows = 'A B C D E F G H I J'.split(' ');
  const boardColumns = '1 2 3 4 5 6 7 8 9 10'.split(' ');
  
  //ships
  const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0,1],
        [0,10]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0,1,2],
        [0,10,10*2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0,1,2],
        [0,10,10*2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0,1,2,3],
        [0,10,10*2,10*3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0,1,2,3,4],
        [0,10,10*2,10*3,10*4]
      ]
    }
  ]

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

  /* const generateShips = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    let direction = null;
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction));

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
    const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name));

    else generateShips(ship);
  } */

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
