const generateShips = (ship) => {
    // ako uzmemo ships array, bit će ili 0 ili 1
    let randomDirection = Math.floor(Math.random() * ship.directions.length);

    // direkcija će biti horizontalna ili vertikalna
    let current = ship.directions[randomDirection];
    let direction = null;
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;

    // osiguraj da brod ne prelazi dno ako je vertikalna pozicija
    let randomStart = Math.floor(Math.random() * squares.length - (ship.directions[0].length * direction));

    // da li je to mjesto zauzeto?
    const isTaken = current.some(index => squares[randomStart + index].classList.contains('taken'));
    
    // da li sam na desnom kraju? osiguraj da ne ide preko grida
    const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
    
    //da li sam na lijevom kraju? osiguraj da ne ide preko grida
    const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);

    // ako mjesto nije zauzeto, nije na desnom ili na lijevom kraju, onda dodaj klasu 'taken' i naziv broda
    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => squares[randomStart + index].classList.add('taken', ship.name));

    else generateShips(ship);
} 
