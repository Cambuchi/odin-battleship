import { Gameboard } from './Gameboard';
import PubSub from './PubSub';

const Player = (name) => {
  let board = Gameboard(name);
  let PubSubBoard = board.PubSubBoard;
  let PubSubPlayer = new PubSub();
  let ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Patrol Boat'];

  const attack = (coordinate, opponent) => {
    let result = opponent.board.receiveAttack(coordinate);
    if (!result) {
      console.log('invalid coordinate, try again');
      return 'redo';
    } else if (result === 'missed') {
      PubSubPlayer.publish('playerMissedAttack');
    } else if (result === 'hit') {
      PubSubPlayer.publish('playerSuccessfulAttack');
    }
  };

  const shipStatus = () => {
    let current = ships;
    let removed = board.shipChange();
    for (let item of removed) {
      if (current.includes(item)) {
        let index = current.indexOf(item);
        current.splice(index, 1);
        console.log(`${name}'s ${item} has been destroyed.`);
        return item;
      }
    }
  };

  const missMessage = () => {
    console.log(`Attack missed ${name}!`);
  };
  const playerMissMessage = () => {
    console.log(`${name}'s attack missed!`);
  };

  const hitMessage = () => {
    console.log(`Attack hit ${name}!`);
  };
  const playerHitMessage = () => {
    console.log(`${name}'s attack hit!`);
  };

  const sunkenMessage = (ship) => {
    console.log(`${name}'s ${ship} has sunk!`);
  };

  const gameOverMessage = (player) => {
    console.log(`${player} has been defeated!`);
    PubSubPlayer.publish('playerGameEnded');
  };

  PubSubBoard.subscribe('missedAttack', missMessage);
  PubSubBoard.subscribe('successfulAttack', hitMessage);
  PubSubBoard.subscribe('sunkenShip', sunkenMessage);
  PubSubBoard.subscribe('gameEnded', gameOverMessage);

  PubSubPlayer.subscribe('playerMissedAttack', playerMissMessage);
  PubSubPlayer.subscribe('playerSuccessfulAttack', playerHitMessage);

  return { board, PubSubPlayer, attack, shipStatus };
};

export { Player };

// let human = Player('Player-1');
// let cpu = Player('CPU');

// // console.log(human.PubSubPlayer)

// const carrier = [1, 2, 3, 4, 5, 6];
// const battleship = [11, 12, 13, 14, 15];
// const cruiser = [21, 22, 23, 24];
// const submarine = [31, 32, 33];
// const patrolBoat = [51, 52];

// human.board.addShip(patrolBoat);
// human.board.addShip(submarine);

// cpu.board.addShip(patrolBoat);
// cpu.board.addShip(submarine);

// human.attack(51, cpu);
// cpu.shipStatus();
// cpu.attack(1, human);
// human.shipStatus();
// human.attack(52, cpu);
// cpu.shipStatus();
// cpu.attack(51, human);
// human.shipStatus();
// human.attack(31, cpu);
// cpu.shipStatus();
// cpu.attack(52, human);
// human.shipStatus();
// human.attack(19, cpu);
// cpu.shipStatus();
// cpu.attack(90, human);
// human.shipStatus();
// human.attack(32, cpu);
// cpu.shipStatus();
// cpu.attack(57, human);
// human.shipStatus();
// human.attack(33, cpu);
// cpu.shipStatus();

// console.log(human.board.shipChange());
// console.log(cpu.board.shipChange());

// // console.log(human.board.isGameOver());
// // console.log(cpu.board.isGameOver());
