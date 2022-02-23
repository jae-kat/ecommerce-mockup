import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header.tsx';

const mainStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 90px 30px;
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header cartCookies={props.cartCookies} />
      <main css={mainStyles}>{props.children}</main>
    </>
  );
}
