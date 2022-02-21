import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const banner = css`
  width: 100vw;
  height: 100vh;
  background-image: url('/banner.jpg');
  background-size: cover;
  text-align: center;
  margin: -100px -10px 0 -10px;
  h1 {
    font-size: 4rem;
    font-weight: bold;
    margin: 35vh 0 15vh 0;
    padding: 15px;
    color: white;
    background-color: #48695ae6;
    border-radius: 6px;
  }
  .shopButton {
    padding: 0.8vw 1vw;
    margin: 5vh;
    background-color: #e1e1e1cc;
    border: 1px solid #ccc;
    border-radius: 6px;
    letter-spacing: 0.1rem;
    color: #5f6266;
    text-decoration: none;
    font-size: 2rem;
    :hover {
      background-color: #e1e1e1d9;
      cursor: pointer;
      color: #48695acc;
    }
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Guts & Jannsen Interiors</title>
        <meta
          name="description"
          content="next.js e-commerce mockup - bootcamp exercise"
        />
      </Head>
      <div css={banner}>
        <h1>Guts & Jannsen Interiors</h1>
        <Link href="/products">
          <a className="shopButton">Shop</a>
        </Link>
      </div>
    </>
  );
}
