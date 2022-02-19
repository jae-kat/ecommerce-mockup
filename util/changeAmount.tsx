import Cookies from 'js-cookie';

type Cookie = { id: number; amount: number };

export function incrementAmount(id: number) {
  // get the current cookie value (filter out cookies with amount <= 0)
  const currentCartCookies: Cookie[] = JSON.parse(
    Cookies.get('cart') || '[]',
  ).filter((cookie: Cookie) => cookie.amount > 0);
  // check if the clicked item is already in the cart
  const productIsInCart = currentCartCookies.some(
    (cookie: Cookie) => id === cookie.id,
  );
  let newCookies: Cookie[];
  // add 1 to the amount in the cart
  if (productIsInCart) {
    newCookies = currentCartCookies.map((cookie: Cookie) => {
      if (cookie.id === id) {
        return { ...cookie, amount: cookie.amount + 1 };
      } else {
        return cookie;
      }
    }); // or add it, if it's not yet in the cart
  } else {
    newCookies = [...currentCartCookies, { id: id, amount: 2 }];
  }

  return newCookies;
}

export function decrementAmount(id: number) {
  // get the current cookie value
  const currentCartCookies: Cookie[] = JSON.parse(
    Cookies.get('cart') || '[]',
  ).filter((cookie: Cookie) => cookie.amount > 0);
  // this is the cookie that needs changing
  const productCookie: Cookie | undefined = currentCartCookies.find(
    (cookie: Cookie) => cookie.id === id,
  );

  let newCookies: Cookie[];

  // delete productCookie, if the amount goes below zero
  if (productCookie === undefined || productCookie.amount - 1 <= 0) {
    newCookies = currentCartCookies.filter(
      (cookie: Cookie) => cookie.id !== id,
    );
  } else {
    // else remove 1 from the amount in the cart
    newCookies = currentCartCookies.map((cookie: Cookie) => {
      if (cookie.id === id) {
        return { ...cookie, amount: cookie.amount - 1 };
      } else {
        return cookie;
      }
    });
  }

  return newCookies;
}
