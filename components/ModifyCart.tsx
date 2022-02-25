import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';
import { addToCart } from '../util/addToCart';
import { decrementAmount, incrementAmount } from '../util/changeAmount';
import { removeFromCart } from '../util/removeFromCart';

// css
const cartStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin: 10px;
    padding: 1.2vw 1.4vw;
    background-color: #48695a;
    border: 1px solid #48695a;
    border-radius: 6px;
    letter-spacing: 0.1rem;
    color: white;
    :hover {
      background-color: #48695acc;
    }
  }
  .changeAmountStyles {
    display: flex;
    flex-direction: row;
    * {
      padding: 0 0.6vw;
    }
  }
  .remove {
    background-color: transparent;
    margin-right: auto;
    margin-top: 5vh;
    padding: 0.5vw;
    border: 1px solid #ccc;
    img {
      width: 20px;
    }
    :hover {
      background-color: #48695a66;
    }
  }
`;
// typescript types
type Cookie = { id: number; amount: number };
type Props = {
  currentProduct: number;
  cartCookies: Cookie[];
  setCartCookies: Dispatch<SetStateAction<Cookie[]>>;
};

export default function ModifyCart(props: Props) {
  const cartCookies = props.cartCookies;
  const setCartCookies = props.setCartCookies;

  // add an item to the cart
  function addItem(id: number) {
    const newCookies = addToCart(id);
    // update the state and the cookies
    setCartCookies(newCookies);
    Cookies.set('cart', JSON.stringify(newCookies));
  }

  // remove an item from the cart
  function removeItem(id: number) {
    const newCookies = removeFromCart(id);
    // update the state and the cookies
    setCartCookies(newCookies);
    Cookies.set('cart', JSON.stringify(newCookies));
  }

  // show the amount of the product that's in the cart
  function productQuantity(id: number) {
    const productCookie = cartCookies.find((item: Cookie) => item.id === id);
    if (!productCookie) {
      return 0;
    } else {
      return productCookie.amount;
    }
  }

  // add to the quantity in the cart
  function addOne(id: number) {
    const newCookies = incrementAmount(id);
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartCookies(newCookies);
  }

  // reduce the quantity in the cart
  function removeOne(id: number) {
    const newCookies = decrementAmount(id);
    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartCookies(newCookies);
  }

  return (
    <div css={cartStyles}>
      <p>{productQuantity(props.currentProduct)} in Cart</p>
      <button
        onClick={() => addItem(props.currentProduct)}
        data-test-id="product-add-to-cart"
      >
        Add to cart
      </button>

      <div className="changeAmountStyles">
        <button
          onClick={() => removeOne(props.currentProduct)}
          data-test-id="remove-one"
        >
          -
        </button>
        <p data-test-id="product-quantity">
          {productQuantity(props.currentProduct) === 0
            ? 1
            : productQuantity(props.currentProduct)}
        </p>
        <button
          onClick={() => addOne(props.currentProduct)}
          data-test-id="add-one"
        >
          +
        </button>
      </div>

      <button
        aria-label="Delete item from cart"
        className="remove"
        onClick={() => removeItem(props.currentProduct)}
      >
        <img src="/delete.svg" alt="" />
      </button>
    </div>
  );
}
