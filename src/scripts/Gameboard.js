import Ship from './Ship';
import PubSub from './pubsub';
import PubSubMain from '../index';

const Gameboard = (player) => {
  // create the board, which is a 10 x 10 grid, logic as an array
  let board = [...Array(100).keys()];
  // record of spaces that are occupied by ships
  let shipSpaces = [];
  // record of successful hits
  let hits = [];
  // record of missed shots
  let misses = [];
  // create PubSub object for board
  let PubSubInstance = new PubSub();
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

  // check if arrays have intersecting values
  const isIntersecting = (array1, array2) => {
    const intersecting = array1.filter((value) => array2.includes(value));
    if (intersecting.length === 0) {
      return false;
    }
    return true;
  };

  // check if two arrays are equal
  function arraysEqual(a1, a2) {
    let a1copy = a1.slice();
    let a2copy = a2.slice();
    return JSON.stringify(a1copy) == JSON.stringify(a2copy);
  }

  // adds a ship onto the board and records the spaces occupied
  const addShip = (array) => {
    // check if ship space is occupied
    if (isIntersecting(array, shipSpaces)) {
      return;
    }
    // check for invalid horizontal placements (wrap-arounds)
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
        return;
      }
    }
    // add ship
    let newShip = Ship(array);
    let shipName = shipTypes[array.length];
    PubSubInstance.subscribe('successfulAttack', newShip.hit);
    ships[shipName] = newShip;
    shipSpaces.push(...array);
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

  const isGameOver = () => {
    let shipSort = shipSpaces.slice().sort();
    let hitsSort = hits.slice().sort();
    if (arraysEqual(shipSort, hitsSort)) {
      // on gameOver state, publish gameover events
      console.log(player + ' has lost');
      PubSubMain.publish('gameOver', player);
      return true;
    }
    return false;
  };

  // bind events
  // add to misses record on missed hits
  PubSubInstance.subscribe('missedAttack', missedAttack);
  // add to hits record on successful hits and checkgame over
  PubSubInstance.subscribe('successfulAttack', successfulAttack);
  // on successful hits, check game state
  PubSubInstance.subscribe('successfulAttack', isGameOver);

  return {
    addShip,
    receiveAttack,
    isGameOver,
  };
};

const carrier = [1, 2, 3, 4, 5, 6];
const battleship = [6, 16, 17, 18, 19];
const cruiser = [19, 20, 21, 22];
const submarine = [31, 32, 33];
const patrolBoat = [41, 42];

const player1 = Gameboard('player1');
const player2 = Gameboard('cpu');

// newGame.addShip(carrier);
// newGame.addShip(battleship);
// newGame.addShip(cruiser);
// newGame.addShip(submarine);
// newGame.addShip(patrolBoat);

// newGame.receiveAttack(1);
// newGame.receiveAttack(19);
// newGame.receiveAttack(19);
// newGame.receiveAttack(20);
// newGame.receiveAttack(2);
// newGame.receiveAttack(3);
// newGame.receiveAttack(4);
// newGame.receiveAttack(5);
// newGame.receiveAttack(6);
// newGame.receiveAttack(32);
// newGame.receiveAttack(33);
// newGame.receiveAttack(41);
// newGame.receiveAttack(31);
// newGame.receiveAttack(42);
// newGame.receiveAttack(102);

// console.log(newGame.hits);
// console.log(newGame.misses);

// newGame2.addShip(carrier);
// // newGame.addShip(battleship)
// // newGame.addShip(cruiser)
// newGame2.addShip(submarine);
// newGame2.addShip(patrolBoat);

// newGame2.receiveAttack(5);
// newGame2.receiveAttack(2);
// newGame2.receiveAttack(1);
// newGame2.receiveAttack(19);
// newGame2.receiveAttack(19);
// newGame2.receiveAttack(20);
// newGame2.receiveAttack(74);

// console.log(newGame2.hits);
// console.log(newGame2.misses);

// console.log(newGame.isGameOver());
// console.log(newGame2.isGameOver());
