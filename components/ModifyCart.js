import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { useState } from 'react';

const cartStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  * {
    padding: 10px 15px;
  }
  button {
    margin: 10px;
    border: 3px solid #5f6266;
    background-color: transparent;
    :hover {
      border-image: linear-gradient(
          45deg,
          #d8b45080,
          #e89d0c80,
          #ebcd5380,
          #d8361e80,
          #6f0da280,
          #c577aa80,
          #47b9e780,
          #67be7b80
        )
        30;
      border-image-slice: 1;
    }
  }
`;

const amountStyles = css`
  display: flex;
`;

export function addOrRemoveItem(id) {
  // get the current cookies
  const currentCookies = Cookies.get('cart') || '[]';
  const currentCartCookies = JSON.parse(currentCookies);
  // update the cookies
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
  const [amountInCart, setAmountInCart] = useState(props.cookies);

  const productIsInCart = amountInCart.some(
    (product) => product.id === props.currentProduct,
  );

  function addToCart(id) {
    const newCookies = addOrRemoveItem(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setAmountInCart(newCookies);
    props.setCartNumber(newCookies);
  }

  function addOne(id) {
    const newCookies = incrementAmount(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setAmountInCart(newCookies);
    props.setCartNumber(newCookies);
  }

  function removeOne(id) {
    const newCookies = decrementAmount(id);
    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setAmountInCart(newCookies);
    props.setCartNumber(newCookies);
  }

  return (
    <div css={cartStyles}>
      <button onClick={() => addToCart(props.currentProduct)}>
        {productIsInCart ? 'Remove from cart' : 'Add to cart'}
      </button>
      {productIsInCart && (
        <div css={amountStyles}>
          <button onClick={() => removeOne(props.currentProduct)}>-</button>
          <p>
            {
              amountInCart.find((item) => item.id === props.currentProduct)
                .amount
            }
          </p>
          <button onClick={() => addOne(props.currentProduct)}>+</button>
        </div>
      )}
    </div>
  );
}
