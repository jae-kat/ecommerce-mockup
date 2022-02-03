import { css } from '@emotion/react';

const navStyles = css`
  background-color: #ccc;
  padding: 10px;
  ul {
    display: flex;
    gap: 20px;
  }
  li {
    list-style: none;
  }
`;

export default function Header() {
  return (
    <nav css={navStyles}>
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Cart</li>
      </ul>{' '}
    </nav>
  );
}
