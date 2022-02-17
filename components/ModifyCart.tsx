import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction, useState } from 'react';

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
type Cookie = { id: number; amount: number };
type Props = {
  currentProduct: number;
  cartCookies: Cookie[];
  setCartCookies: Dispatch<SetStateAction<Cookie[]>>;
};

export function addItem(id: number) {
  // get the current cookies
  const currentCartCookies: Cookie[] = JSON.parse(
    Cookies.get('cart') || '[]',
  ).filter((cookie: Cookie) => cookie.amount > 0);

  let newCookies: Cookie[];
  // check if the clicked item is already in the cart
  const productIsInCart = currentCartCookies.some(
    (cookie: Cookie) => id === cookie.id,
  );

  // if the product is already in the cart, delete it
  if (productIsInCart) {
    newCookies = currentCartCookies;
  } // if the product isn't in the cart, add it
  else {
    newCookies = [...currentCartCookies, { id: id, amount: 1 }];
  }
  // return the new cookie array

  return newCookies;
}

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
    newCookies = [...currentCartCookies, { id: id, amount: 1 }];
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

export default function ModifyCart(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const cartCookies = props.cartCookies;
  const setCartCookies = props.setCartCookies;

  function addToCart(id: number) {
    const newCookies = addItem(id);
    // update the state
    setCartCookies(newCookies);
    // update the cookies
    Cookies.set('cart', JSON.stringify(newCookies));
  }

  function addOne(id: number) {
    const newCookies = incrementAmount(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartCookies(newCookies);
  }

  function removeOne(id: number) {
    const newCookies = decrementAmount(id);
    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartCookies(newCookies);
  }

  function productQuantity(id: number) {
    const productCookie = cartCookies.find((item: Cookie) => item.id === id);
    if (!productCookie) {
      return 0;
    } else {
      return productCookie.amount;
    }
  }

  return (
    <div css={cartStyles}>
      <div className="amountStyles" data-test-id="product-quantity">
        <button onClick={() => removeOne(props.currentProduct)}>-</button>
        <p>{productQuantity(props.currentProduct)}</p>
        <button onClick={() => addOne(props.currentProduct)}>+</button>
      </div>

      <button
        onClick={() => addToCart(props.currentProduct)}
        className="addButton"
        data-test-id="product-add-to-cart"
      >
        Add to cart
      </button>
    </div>
  );
}
