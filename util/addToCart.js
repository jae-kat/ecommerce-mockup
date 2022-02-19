import Cookies from 'js-cookie';

export const addToCart = (id) => {
  // get the cookies
  const currentCookies = JSON.parse(Cookies.get('cart') || '[]');
  // check if the item is already in the cart
  const productIsInCart = currentCookies.some((cookie) => cookie.id === id);

  let newCookies = [];
  // add the item, if it's not in the cart
  if (!productIsInCart) {
    newCookies = [...currentCookies, { id: id, amount: 1 }];
  } else {
    // if the item is already in the cart, dont't do anything
    newCookies = currentCookies;
  }

  return newCookies;
};
