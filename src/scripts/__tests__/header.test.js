/**
 * @jest-environment jsdom
 */

import createHeader from '../header';

test('create initial header area', () => {
  let header = createHeader();
  expect(header.id).toBe('header');
  expect(header.innerHTML).toBe('<p class="title">BATTLESHIP</p>');
});
