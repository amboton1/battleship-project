//ships
export const shipArray = [
    {
      name: 'destroyer',
      size: 2,
      class: 'red',
      coordinates: []
    },
    {
      name: 'submarine',
      size: 3,
      class: 'green',
      coordinates: []
    },
    {
      name: 'cruiser',
      size: 3,
      class: 'green',
      coordinates: []
    },
    {
      name: 'battleship',
      size: 4,
      class: 'purple',
      coordinates: []
    },
    {
      name: 'carrier',
      size: 5,
      class: 'blue',
      coordinates: []
    }
]

const getDirection = (pocetna, size) => {
  // get direction - 0 vertical, 1 horizontal
  let direction = Math.floor(Math.random())

  const y = Math.floor(pocetna / 10)
  const x = pocetna - (y * 10)

  if (direction === 0) {
    if (y - size <= 0) direction = 10
    if (y + size >= 10) direction = -10
    else direction = 10
  }
  if (direction === 1) {
    if (x - size <= 0) direction = 1
    if (x + size >= 10) direction = -1
    else direction = 1
  }

  return direction;
}

const fillShipsCoordinates = () => {
  shipArray.map((ship) => {
    let pocetnaRandomPozicija = Math.floor(Math.random() * 100);
    const smjer = getDirection(pocetnaRandomPozicija, ship.size);

    for (let index = 0; index < ship.size; index++) {
      ship.coordinates.push(pocetnaRandomPozicija)
      pocetnaRandomPozicija += smjer
    }
  })
}

fillShipsCoordinates()