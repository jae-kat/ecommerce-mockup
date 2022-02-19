import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';
import { decrementAmount, incrementAmount } from '../util/changeAmount';
import { addToCart } from './addToCart';
import { removeFromCart } from './removeFromCart';

// css
const cartStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
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
    }
  }
  .changeAmountStyles {
    display: flex;
    flex-direction: row;
    * {
      padding: 3px 6px;
      margin: 3px;
    }
    p {
      padding: 4px 0;
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
      <button
        onClick={() => addItem(props.currentProduct)}
        data-test-id="product-add-to-cart"
      >
        Add to cart
      </button>

      <p>{productQuantity(props.currentProduct)} added to Cart</p>
      <div className="changeAmountStyles">
        <button onClick={() => removeOne(props.currentProduct)}>-</button>
        <p data-test-id="product-quantity">
          {productQuantity(props.currentProduct) === 0
            ? 1
            : productQuantity(props.currentProduct)}
        </p>
        <button onClick={() => addOne(props.currentProduct)}>+</button>

        <button
          aria-label="Remove item from cart"
          onClick={() => removeItem(props.currentProduct)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
