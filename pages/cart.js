import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { readAllProducts } from '../util/database';

const cartPageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const itemStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 15px;
  border: 2px solid powderblue;
  border-radius: 7px;
  width: 60vw;
`;

export default function Cart(props) {
  // find out which items are in the cart
  const cartItems = props.productList.filter((product) => {
    return props.cookies.some((cookie) => cookie.id === product.id);
  });

export default function Cart() {
  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <p>hello this is a shopping cart</p>
    </Layout>
  );
}
