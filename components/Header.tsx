import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100%;
  height: 8vh;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 5px rgba(200, 200, 200, 0.3);
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 0 20px;
  a {
    text-decoration: none;
    color: #5f6266;
    font-size: 1.1rem;
  }
  .cart {
    margin-left: auto;
  }
`;

type Cookie = {
  id: number;
  amount: number;
};

type Props = {
  cartCookies: Cookie[];
};

// find the number of items in the cart
export function cartQuantity(cartCookies: Cookie[]) {
  const sum = cartCookies
    .filter((cookie) => cookie.amount > 0)
    .reduce((previousValue, cookie) => {
      return previousValue + cookie.amount;
    }, 0);
  return sum;
}

export default function Header(props: Props) {
  return (
    <nav css={navStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a data-test-id="products-link">Products</a>
      </Link>
      <Link href="/cart" data-test-id="cart-link">
        <a className="cart">
          Cart <img src="/shopping-cart.svg" alt="" height="20px" /> {'  '}
          <span data-test-id="cart-count">
            {cartQuantity(props.cartCookies)}
          </span>
        </a>
      </Link>
    </nav>
  );
}
