import Ship from './Ship';

test('create ship', () => {
  let patrolBoat = Ship([11, 21]);
  expect(patrolBoat.info).toEqual({
    11: 'safe',
    21: 'safe',
  });
});

test('hit ship', () => {
  let destroyer = Ship([11, 21, 31]);
  destroyer.hit(21);
  expect(destroyer.info).toEqual({
    11: 'safe',
    21: 'hit',
    31: 'safe',
  });
});

test('miss ship', () => {
  let destroyer = Ship([11, 21, 31]);
  destroyer.hit(23);
  expect(destroyer.info).toEqual({
    11: 'safe',
    21: 'safe',
    31: 'safe',
  });
});

test('ship is not sunken', () => {
  let destroyer = Ship([11, 21, 31]);
  destroyer.hit(21);
  destroyer.hit(11);
  expect(destroyer.isSunk()).toBe(false);
});

test('ship is sunken', () => {
  let destroyer = Ship([1, 2, 3]);
  destroyer.hit(2);
  destroyer.hit(1);
  destroyer.hit(3);
  expect(destroyer.isSunk()).toBe(true);
});
