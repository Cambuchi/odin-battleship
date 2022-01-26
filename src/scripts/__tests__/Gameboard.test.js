import {
  Gameboard,
  isIntersecting,
  isWrapAround,
  areArraysEqual,
} from '../Gameboard';

const carrier = [1, 2, 3, 4, 5, 6];
const battleship = [11, 12, 13, 14, 15];
const cruiser = [21, 22, 23, 24];
const submarine = [31, 32, 33];
const patrolBoat = [41, 42];

const outOfBounds = [99, 100, 101];
const overlap1 = [11, 12, 13, 14, 15];
const overlap2 = [13, 14, 15, 16];
const wrapAround = [9, 10, 11];
const cruiserCopy = [21, 22, 23, 24];

test('regular game over 1', () => {
  let playerBoard = Gameboard('player');
  playerBoard.addShip(carrier);
  playerBoard.receiveAttack(1);
  playerBoard.receiveAttack(2);
  playerBoard.receiveAttack(3);
  playerBoard.receiveAttack(4);
  playerBoard.receiveAttack(5);
  playerBoard.receiveAttack(6);
  expect(playerBoard.isGameOver()).toBe(true);
});

test('regular game over 2', () => {
  let playerBoard = Gameboard('player');
  playerBoard.addShip(patrolBoat);
  playerBoard.receiveAttack(41);
  playerBoard.receiveAttack(42);
  playerBoard.receiveAttack(3);
  playerBoard.receiveAttack(43);
  playerBoard.receiveAttack(66);
  playerBoard.receiveAttack(16);
  expect(playerBoard.isGameOver()).toBe(true);
});

test('regular not game over', () => {
  let playerBoard = Gameboard('player');
  playerBoard.addShip(carrier);
  playerBoard.receiveAttack(1);
  playerBoard.receiveAttack(2);
  playerBoard.receiveAttack(3);
  playerBoard.receiveAttack(14);
  playerBoard.receiveAttack(5);
  expect(playerBoard.isGameOver()).toBe(false);
});

test('wrapAround not game over', () => {
  let playerBoard = Gameboard('player');
  playerBoard.addShip(wrapAround);
  playerBoard.receiveAttack(9);
  playerBoard.receiveAttack(10);
  playerBoard.receiveAttack(11);
  expect(playerBoard.isGameOver()).toBe(false);
});

test('OOB not game over', () => {
  let playerBoard = Gameboard('player');
  playerBoard.addShip(outOfBounds);
  playerBoard.receiveAttack(99);
  playerBoard.receiveAttack(100);
  playerBoard.receiveAttack(101);
  expect(playerBoard.isGameOver()).toBe(false);
});

test('isWrapAround test on wrap around ship', () => {
  expect(isWrapAround(wrapAround)).toBe(true);
});

test('isWrapAround test on valid ship', () => {
  expect(isWrapAround(submarine)).toBe(false);
});

test('isIntersecting on two overlap ships', () => {
  expect(isIntersecting(overlap1, overlap2)).toBe(true);
});

test('isIntersecting on two valid ships', () => {
  expect(isIntersecting(carrier, battleship)).toBe(false);
});

test('areArraysEqual on two identical arrays', () => {
  expect(areArraysEqual(cruiser, cruiserCopy)).toBe(true);
});

test('areArraysEqual on two different arrays', () => {
  expect(areArraysEqual(cruiser, patrolBoat)).toBe(false);
});
