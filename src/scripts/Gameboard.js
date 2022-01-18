import Ship from './Ship';
import PubSub from './PubSub';

const Gameboard = (player) => {
  // create PubSub object for board
  let PubSubInstance = new PubSub();
  // create the board, which is a 10 x 10 grid, logic as an array
  let board = [...Array(100).keys()];
  // record of spaces that are occupied by ships
  let shipSpaces = [];
  // record of successful hits
  let hits = [];
  // record of missed shots
  let misses = [];
  // create ship data
  let ships = {};
  // create ship types
  const shipTypes = {
    6: 'Carrier',
    5: 'Battleship',
    4: 'Cruiser',
    3: 'Submarine',
    2: 'Patrol Boat',
  };

  // adds a ship onto the board and records the spaces occupied
  const addShip = (array) => {
    // check if ship space is occupied
    if (isIntersecting(array, shipSpaces)) {
      return;
    }
    // check for invalid horizontal placements (wrap-arounds)
    if (isWrapAround(array)) {
      return;
    }
    // add ship
    let newShip = Ship(array);
    let shipName = shipTypes[array.length];
    // on successful hits, udpate individual ship hits if needed
    PubSubInstance.subscribe('successfulAttack', newShip.hit);
    // on successful hits, check if individual ship has sunk
    PubSubInstance.subscribe('successfulAttack', function () {
      pubShipSink(newShip, shipName);
    });
    ships[shipName] = newShip;
    shipSpaces.push(...array);
  };

  const pubShipSink = (ship, name) => {
    if ('isSunk' in ship) {
      if (ship.isSunk()) {
        PubSubInstance.publish('sunkenShip', name);
        delete ship.isSunk;
      }
    }
  };

  const receiveAttack = (coordinate) => {
    // make sure the coordinate passed in is valid
    if (!board.includes(coordinate)) {
      return;
    }
    // make sure the coordinate passed in is a new one
    else if (hits.includes(coordinate) || misses.includes(coordinate)) {
      return;
    }
    // if the coordinate is a miss
    else if (!shipSpaces.includes(coordinate) && !misses.includes(coordinate)) {
      PubSubInstance.publish('missedAttack', coordinate);
    }
    // if the coordinate is a hit
    else if (shipSpaces.includes(coordinate) && !hits.includes(coordinate)) {
      PubSubInstance.publish('successfulAttack', coordinate);
    }
  };

  const successfulAttack = (coordinate) => {
    hits.push(coordinate);
  };

  const missedAttack = (coordinate) => {
    misses.push(coordinate);
  };

  const shipSank = (name) => {
    console.log(`${player}'s ${name} has been destroyed!`);
    return name;
  };

  const isGameOver = () => {
    // check for invalid board state (no ship spaces)
    if (shipSpaces.length < 1) {
      return false;
    }
    let shipSort = shipSpaces.slice().sort();
    let hitsSort = hits.slice().sort();
    if (areArraysEqual(shipSort, hitsSort)) {
      // on gameOver state, publish gameover events
      return true;
    }
    return false;
  };

  // bind pubsub events
  // add to misses record on missed hits
  PubSubInstance.subscribe('missedAttack', missedAttack);
  // add to hits record on successful hits and checkgame over
  PubSubInstance.subscribe('successfulAttack', successfulAttack);
  // on successful hits, check game state
  PubSubInstance.subscribe('successfulAttack', isGameOver);
  // on ship sinking,
  PubSubInstance.subscribe('sunkenShip', shipSank);

  return {
    addShip,
    receiveAttack,
    isGameOver,
  };
};

// check if arrays have intersecting values
const isIntersecting = (array1, array2) => {
  const intersecting = array1.filter((value) => array2.includes(value));
  if (intersecting.length === 0) {
    return false;
  }
  return true;
};

const isWrapAround = (array) => {
  // values that cannot exist in a ship due to grid wrapping
  const wrapArounds = [
    [9, 10],
    [19, 20],
    [29, 30],
    [39, 40],
    [49, 50],
    [59, 60],
    [69, 70],
    [79, 80],
    [89, 90],
  ];
  for (let invalids of wrapArounds) {
    if (array.includes(invalids[0]) && array.includes(invalids[1])) {
      return true;
    }
  }
  return false;
};

// check if two arrays are equal
const areArraysEqual = (a1, a2) => {
  let a1copy = a1.slice();
  let a2copy = a2.slice();
  return JSON.stringify(a1copy) == JSON.stringify(a2copy);
};

export { Gameboard, isIntersecting, isWrapAround, areArraysEqual };

// const carrier = [1, 2, 3, 4, 5, 6];
// const battleship = [11, 12, 13, 14, 15];
// const cruiser = [21, 22, 23, 24];
// const submarine = [31, 32, 33];
// const patrolBoat = [41, 42];

// const outOfBounds = [96, 97, 98, 99, 100, 101];
// const overlap1 = [11, 12, 13, 14, 15];
// const overlap2 = [13, 14, 15, 16];
// const wrapAround = [9, 10, 11];

// const player1 = Gameboard('Player-1');
// const player2 = Gameboard('cpu');

// player1.addShip(carrier);
// // player1.addShip(battleship);
// // player1.addShip(cruiser);
// player1.addShip(submarine);
// player1.addShip(patrolBoat);

// player1.addShip(wrapAround);
// player1.receiveAttack(9);
// player1.receiveAttack(10);
// player1.receiveAttack(11);
// // console.log(player1.shipSpaces);
// // console.log(player1.hits);

// player1.receiveAttack(1);
// player1.receiveAttack(19);
// player1.receiveAttack(19);
// player1.receiveAttack(20);
// player1.receiveAttack(2);
// player1.receiveAttack(3);
// player1.receiveAttack(4);
// player1.receiveAttack(5);
// player1.receiveAttack(6);
// player1.receiveAttack(32);
// player1.receiveAttack(33);
// player1.receiveAttack(41);
// player1.receiveAttack(31);
// player1.receiveAttack(42);
// player1.receiveAttack(102);

// // console.log(player1.hits);
// // console.log(player1.misses);

// player2.addShip(carrier);
// // player2.addShip(battleship)
// // player2.addShip(cruiser)
// player2.addShip(submarine);
// player2.addShip(patrolBoat);

// player2.receiveAttack(5);
// player2.receiveAttack(2);
// player2.receiveAttack(1);
// player2.receiveAttack(19);
// player2.receiveAttack(19);
// player2.receiveAttack(20);
// player2.receiveAttack(74);

// // console.log(player2.hits);
// // console.log(player2.misses);

// // console.log(player1.ships);
// // console.log(player2.ships);

// console.log(player1.isGameOver());
// console.log(player2.isGameOver());
