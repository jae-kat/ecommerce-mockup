import Cookies from 'js-cookie';
import { useState } from 'react';

export function addOrRemoveItem(id) {
  // get the current cookies
  const currentCookies = Cookies.get('cart') || '[]';
  const currentCartCookies = JSON.parse(currentCookies);
  // update the cookies
  let newCookies;

  // check if the clicked item is already in the cart
  const productIsInCart = currentCartCookies.some(
    (cookieItem) => id === cookieItem.id,
  );

  // if the product is already in the cart, delete it
  if (productIsInCart) {
    newCookies = currentCartCookies.filter((item) => id !== item.id);
  } // if the product isn't in the cart, add it
  else {
    newCookies = [...currentCartCookies, { id: id, amount: 1 }];
  }

  return newCookies;
}

export function incrementAmount(id) {
  // get the current cookie value
  const currentCartCookies = JSON.parse(Cookies.get('cart'));
  // add 1 to the amount in the cart
  const newCookies = currentCartCookies.map((cookie) => {
    if (cookie.id === id) {
      return { ...cookie, amount: cookie.amount + 1 };
    } else {
      return cookie;
    }
  });

  return newCookies;
}

export function decrementAmount(id) {
  // get the current cookie value
  const currentCartCookies = JSON.parse(Cookies.get('cart'));
  // this is the cookie that needs to changing
  const productCookie = currentCartCookies.find((cookie) => cookie.id === id);
  let newCookies;
  // delete productCookie, if the amount goes below zero
  if (productCookie.amount - 1 === 0) {
    newCookies = currentCartCookies.filter((cookie) => cookie.id !== id);
  } else {
    // else remove 1 from the amount in the cart
    newCookies = currentCartCookies.map((cookie) => {
      if (cookie.id === id) {
        return { ...cookie, amount: cookie.amount - 1 };
      } else {
        return cookie;
      }
    });
  }

  return newCookies;
}

export default function ModifyCart(props) {
  const [cartProducts, setCartProducts] = useState(props.cookies);
  const productIsInCart = cartProducts.some(
    (product) => product.id === props.currentProduct,
  );

  function addToCart(id) {
    const newCookies = addOrRemoveItem(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartProducts(newCookies);
  }

  function addOne(id) {
    const newCookies = incrementAmount(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartProducts(newCookies);
  }

  function removeOne(id) {
    const newCookies = decrementAmount(id);
    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartProducts(newCookies);
  }

  return (
    <div>
      <button onClick={() => addToCart(props.currentProduct)}>
        {productIsInCart ? 'Remove from cart' : 'Add to cart'}
      </button>
      {productIsInCart && (
        <div>
          <button onClick={() => addOne(props.currentProduct)}>+</button>
          <p>
            {
              cartProducts.find((item) => item.id === props.currentProduct)
                .amount
            }
          </p>
          <button onClick={() => removeOne(props.currentProduct)}>-</button>
        </div>
      )}
    </div>
  );
}
