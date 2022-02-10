import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
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
  // find out which items are in the cart and put them in a state variable
  const [cartItems, setCartItems] = useState(
    props.productList.filter((product) => {
      return props.cookies.some((cookie) => cookie.id === product.id);
    }),
  );
  // this variable will save the total price of each product in an array
  let itemTotals = [];

  function removeItem(id) {
    // update the cart state variable
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems([...updatedCartItems]);
    // update the cookies
    const currentCookies = JSON.parse(Cookies.get('cart'));
    const newCookies = currentCookies.filter((cookie) => cookie.id !== id);
    Cookies.set('cart', JSON.stringify(newCookies));
  }

  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="View your shopping cart" />
      </Head>
      <div css={cartPageStyles}>
        {cartItems.map((item) => {
          const amountInCart = props.cookies.find(
            (cookie) => cookie.id === item.id,
          ).amount;
          const total = item.price * amountInCart;
          itemTotals = [...itemTotals, total];

          return (
            <div css={itemStyles} key={`cartProduct-${item.id}`}>
              <img src={item.image} alt="product" height="90px" />
              <p>{item.title}</p>
              <p>Amount: {amountInCart}</p>
              <p>
                Price per item: {item.price} Total: {total}{' '}
              </p>
            </div>
          );
        })}
        {itemTotals.length === 0 ? (
          'There are currently no products in your cart'
        ) : (
          <div css={totalStyles}>
            {`Total: ${itemTotals.reduce((previousValue, currentValue) => {
              return previousValue + currentValue;
            }, 0)}
            `}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // get the cookie info
  const cookies = JSON.parse(context.req.cookies.cart || '[]');
  // get the productList from the database
  const productList = await readAllProducts();

  return {
    props: {
      cookies,
      productList,
    },
  };
}

// on this page i need to display:
// 1. a row for each product that's in the cart
//  -- small image done
//  -- title done
//  -- amount and + - !! add changing the amount here
//  -- price done
// 2. the sum that will need to be paid !! do this
