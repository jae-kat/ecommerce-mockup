import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 5px rgba(200, 200, 200, 0.3);
  padding: 10px;
  ul {
    display: flex;
    gap: 20px;
  }
  li {
    list-style: none;
    a {
      :hover {
        cursor: pointer;
      }
    }
  }
`;

export function itemCount(cookies) {
  const amountOfItems = cookies.reduce((previousValue, cookie) => {
    return previousValue + cookie.amount;
  }, 0);
  return amountOfItems;
}

export default function Header(props) {
  const cookies = props.cartNumber;
  return (
    <nav css={navStyles}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <a>Cart ({itemCount(cookies)} items)</a>
          </Link>
        </li>
      </ul>{' '}
    </nav>
  );
}
