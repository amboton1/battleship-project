const getDirection = (pocetna, size) => {
  // get direction - 0 vertical, 1 horizontal
  let direction = Math.floor(Math.random() * 2)

  const y = Math.floor(pocetna / 10)
  const x = pocetna - (y * 10)

  if (direction === 0) {
    if (y - size <= 0) direction = 10
    else if (y + size >= 10) direction = -10
    else direction = 10
  }
  if (direction === 1) {
    if (x - size <= 0) direction = 1
    else if (x + size >= 10) direction = -1
    else direction = 1
  }

  return direction;
}

const checkColisionCondition = (ship, coordinate) => {
  if (ship.coordinates.includes(coordinate) ||
      ship.coordinates.includes(coordinate + 1) ||
      ship.coordinates.includes(coordinate - 1) ||
      ship.coordinates.includes(coordinate + 10) ||
      ship.coordinates.includes(coordinate - 10) ||
      ship.coordinates.includes(coordinate - 10 - 1) ||
      ship.coordinates.includes(coordinate - 10 + 1) ||
      ship.coordinates.includes(coordinate + 10 - 1) ||
      ship.coordinates.includes(coordinate + 10 + 1)) {
      return true;
  }
}

const isColision = (coordinate, shipArray) => {
  let result = false;
  for (const shipElement of shipArray) {
    const ship = shipElement;

    if (checkColisionCondition(ship, coordinate)) {
      result = true;
      break;
    }
  }
  return result;
}

export const fillShipsCoordinates = (shipArray) => {
  shipArray.forEach((ship) => {
    let tempCoordinates = [];
    let doWork = true;

    while (doWork) {
      let coordinate = Math.floor(Math.random() * 100);
      let direction = getDirection(coordinate, ship.size);

      for (let i = 0; i < ship.size; i++) {
        if (isColision(coordinate, shipArray)) {
          tempCoordinates = [];
          break;
        }

        tempCoordinates.push(coordinate);
        coordinate += direction;

        if (tempCoordinates.length === ship.size) {
          doWork = false;
        }
      }
    }
    ship.coordinates.push(...tempCoordinates);
  })
}