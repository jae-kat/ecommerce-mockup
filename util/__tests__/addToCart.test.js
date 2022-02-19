import { addToCart } from '../addToCart';

test('adds the item to the cookie array', () => {
  expect(addToCart(2)).toStrictEqual([{ id: 2, amount: 1 }]);
  expect(addToCart(4)).toStrictEqual([{ id: 4, amount: 1 }]);
});
