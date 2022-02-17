import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { useState } from 'react';

const cartStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  * {
    padding: 10px 15px;
  }
  button {
    margin: 10px;
    border: 3px solid #5f6266;
    background-color: transparent;
    :hover {
      border-image: linear-gradient(45deg, #5173a6, #195b80, #ef6849, #f7c200);
      border-image-slice: 1;
      .addButton {
        width: 140px;
      }
    }
  }
  .amountStyles {
    display: flex;
  }
`;

export function addOrRemoveItem(id) {
  // get the current cookies
  const currentCartCookies = JSON.parse(Cookies.get('cart') || '[]').filter(
    (cookie) => cookie.amount > 0,
  );

  let newCookies;
  // check if the clicked item is already in the cart
  const productIsInCart = currentCartCookies.some((cookie) => id === cookie.id);

  // if the product is already in the cart, delete it
  if (productIsInCart) {
    newCookies = currentCartCookies.filter((item) => id !== item.id);
  } // if the product isn't in the cart, add it
  else {
    newCookies = [...currentCartCookies, { id: id, amount: 1 }];
  }
  // update the cookies
  Cookies.set('cart', JSON.stringify(newCookies));
  return newCookies;
}

export function incrementAmount(id) {
  // get the current cookie value
  const currentCartCookies = JSON.parse(Cookies.get('cart')).filter(
    (cookie) => cookie.amount > 0,
  );
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
  const currentCartCookies = JSON.parse(Cookies.get('cart')).filter(
    (cookie) => cookie.amount > 0,
  );
  // this is the cookie that needs changing
  const productCookie = currentCartCookies.find((cookie) => cookie.id === id);
  let newCookies;

  // delete productCookie, if the amount goes below zero
  if (productCookie === undefined || productCookie.amount - 1 <= 0) {
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
  const cartCookies = props.cartCookies;
  const setCartCookies = props.setCartCookies;

  const productIsInCart = cartCookies.some(
    (product) => product.id === props.currentProduct && product.amount > 0,
  );

  function addToCart(id) {
    const newCookies = addOrRemoveItem(id);
    // update the state
    setCartCookies(newCookies);
  }

  function addOne(id) {
    const newCookies = incrementAmount(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartCookies(newCookies);
  }

  function removeOne(id) {
    const newCookies = decrementAmount(id);
    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartCookies(newCookies);
  }

  return (
    <div css={cartStyles}>
      <button
        onClick={() => addToCart(props.currentProduct)}
        className="addButton"
        data-test-id="product-add-to-cart"
      >
        {productIsInCart ? 'Remove from cart' : 'Add to cart'}
      </button>
      {productIsInCart && (
        <div className="amountStyles">
          <button onClick={() => removeOne(props.currentProduct)}>-</button>
          <p data-test-id="product-quantity">
            {
              cartCookies.find((item) => item.id === props.currentProduct)
                .amount
            }
          </p>
          <button onClick={() => addOne(props.currentProduct)}>+</button>
        </div>
      )}
    </div>
  );
}
