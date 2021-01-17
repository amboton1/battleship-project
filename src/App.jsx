import React, { useState } from 'react';
import './App.css';
import { Col, Grid, Row, Container } from './2DArray.styled';

const App = () => {
  const [column, setColumn] = useState(null);

  const handleClick = (index) => {
    setColumn(index);
  }

  const renderGridSystem = () => {
    let grid = [];
    let cols = [];

    for (let index = 1; index <= 10; index++) {
      cols.push(
        <Col onClick={() => handleClick(index)} id={index} style={{backgroundColor: index === column ? 'blue' : ''}} key={index} size={1} />
      )
    }

    for (let index = 1; index <= 10; index++) {
      grid.push(
        <Row id={index} key={index}>
          {cols}
        </Row>
      )
    }

    return <Grid>{grid}</Grid>;
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
