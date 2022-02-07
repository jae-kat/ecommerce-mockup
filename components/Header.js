import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100vw;
  background-color: powderblue;
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

export default function Header() {
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
            <a>Cart</a>
          </Link>
        </li>
      </ul>{' '}
    </nav>
  );
}
