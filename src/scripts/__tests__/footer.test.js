/**
 * @jest-environment jsdom
 */

import createFooter from '../footer';

test('create initial footer area', () => {
  let footer = createFooter();
  expect(footer.id).toBe('footer');
  expect(footer.innerHTML).toBe('Copyright © 2021 Cam Nguyen');
});
