/**
 * @jest-environment jsdom
 */

import createContent from '../content';

test('create initial content area', () => {
  let content = createContent();
  expect(content.id).toBe('content');
  expect(content.innerHTML).toBe(
    '<div id="messages"></div><div id="gridContainer"></div><div id="buttons"></div>',
  );
});
