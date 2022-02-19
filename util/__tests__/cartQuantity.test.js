import { cartQuantity } from '../../components/Header';

test('displays the number of items in the cart', () => {
  const cartCookies = [
    { id: 1, amount: 3 },
    { id: 2, amount: 1 },
    { id: 5, amount: 1 },
  ];
  expect(cartQuantity(cartCookies)).toBe(5);
});
