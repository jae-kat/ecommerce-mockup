import Cookies from 'js-cookie';
import { addToCart } from '../addToCart';
import { removeFromCart } from '../removeFromCart';

test('adds and removes cart items', () => {
  const cookies = [
    { id: 1, amount: 1 },
    { id: 3, amount: 2 },
  ];
  Cookies.set('cart', JSON.stringify(cookies));
  // when i run this function
  let newCookies = addToCart(2);
  // and set the return as the cookies
  Cookies.set('cart', JSON.stringify(newCookies));
  // i expect the cookies to have added an object with matching id and amount
  expect(JSON.parse(Cookies.get('cart'))).toStrictEqual([
    { id: 1, amount: 1 },
    { id: 3, amount: 2 },
    { id: 2, amount: 1 },
  ]);
  // when i run the remove function
  newCookies = removeFromCart(1);
  // and use the return to set the cookies
  Cookies.set('cart', JSON.stringify(newCookies));
  // i expect the cookies to not contain the object with the matching id any more
  expect(JSON.parse(Cookies.get('cart'))).toStrictEqual([
    { id: 3, amount: 2 },
    { id: 2, amount: 1 },
  ]);
});
