import Cookies from 'js-cookie';
import { decrementAmount, incrementAmount } from '../changeAmount';

test('adjust the amount of an item in the cart, never below zero', () => {
  // these are the current cookies
  const cookies = [
    { id: 1, amount: 1 },
    { id: 2, amount: 1 },
    { id: 4, amount: 3 },
  ];
  Cookies.set('cart', JSON.stringify(cookies));
  // i use the increment function for id2 and set the cookies
  let newCookies = incrementAmount(2);
  Cookies.set('cart', JSON.stringify(newCookies));
  // i expect the current cookies to have added 1 to the amount of id2
  expect(JSON.parse(Cookies.get('cart') || '[]')).toStrictEqual([
    { id: 1, amount: 1 },
    { id: 2, amount: 2 },
    { id: 4, amount: 3 },
  ]);
  // i use the decrement function for id4 and set the cookies
  newCookies = decrementAmount(4);
  Cookies.set('cart', JSON.stringify(newCookies));
  // i expect the current cookies to have reduced the amount of id4 by 1
  expect(JSON.parse(Cookies.get('cart') || '[]')).toStrictEqual([
    { id: 1, amount: 1 },
    { id: 2, amount: 2 },
    { id: 4, amount: 2 },
  ]);
  // run the decrement function twice for id1 and set the cookies
  newCookies = decrementAmount(1);
  Cookies.set('cart', JSON.stringify(newCookies));
  newCookies = decrementAmount(1);
  Cookies.set('cart', JSON.stringify(newCookies));
  // i expect the current cookies to have deleted id1 and not have gone below 0
  expect(JSON.parse(Cookies.get('cart') || '[]')).toStrictEqual([
    { id: 2, amount: 2 },
    { id: 4, amount: 2 },
  ]);
});
