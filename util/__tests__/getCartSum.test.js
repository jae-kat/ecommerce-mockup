import { getCartSum } from '../getCartSum';

test('takes the item prices and amounts, gives the total', () => {
  const cart = [
    {
      price: 3,
      amount: 1,
    },
    {
      price: 7,
      amount: 1,
    },
    {
      price: 4,
      amount: 2,
    },
  ];
  expect(getCartSum(cart)).toBe(18);
});
