import { css } from '@emotion/react';

const footerStyles = css`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: powderblue;
  padding: 20px;
`;

export default function Footer() {
  return <div css={footerStyles}>This is a footer</div>;
}
