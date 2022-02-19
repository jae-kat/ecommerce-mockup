import Cookies from 'js-cookie';

export const removeFromCart = (id) => {
  // get the cookies
  const currentCookies = JSON.parse(Cookies.get('cart') || '[]');

  // filter out the item
  const newCookies = currentCookies.filter((cookie) => cookie.id !== id);

  // return the newCookie variable
  return newCookies;
};
