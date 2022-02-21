import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const thanks = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: justify;
  }
  .goBack {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 1vw;
    background-color: transparent;
    text-decoration: none;
    color: #5f6266;
    :hover {
      background-color: #48695acc;
      border: 1px solid #48695acc;
      color: white;
    }
  }
`;

export default function Thankyou() {
  return (
    <>
      <Head>
        <title>Thank you</title>
        <meta name="description" content="Thank you for your order" />
      </Head>
      <div css={thanks}>
        <h1>Thank you for your order!</h1>
        <p>
          We have sent you an order confirmation. You will receive another email
          when your shipment leaves our warehouse within the next 3-5 days.
        </p>
        <Link href="/products">
          <a className="goBack"> ➞ Continue Shopping</a>
        </Link>
      </div>
    </>
  );
}
