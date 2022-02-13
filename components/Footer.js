import { css } from '@emotion/react';

const footerStyles = css`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 5px rgba(200, 200, 200, 0.3);
  padding: 20px;
`;

export default function Footer() {
  return <div css={footerStyles}>This is a footer</div>;
}
