import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
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
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 7px;
  width: 60vw;
  img {
    border-radius: 7px;
  }
`;

const totalStyles = css`
  margin: 15px;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 7px;
  width: 60vw;
  text-align: right;
`;

export default function Cart(props) {
  const [cart, setCart] = useState(props.cart);

  // this variable will save the total price of each product in an array
  let itemTotals = [];

  function removeItem(id) {
    // update the cart state variable
    const updatedCartItems = cart.filter((item) => item.id !== id);
    setCart([...updatedCartItems]);
    // update the cookies
    const currentCookies = JSON.parse(Cookies.get('cart'));
    const newCookies = currentCookies.filter((cookie) => cookie.id !== id);
    Cookies.set('cart', JSON.stringify(newCookies));
    // update the cartNumber for the header
    props.setCartNumber(newCookies);
  }

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="View your shopping cart" />
      </Head>
      <div css={cartPageStyles}>
        {cart.map((item) => {
          const total = item.price * item.amount;
          itemTotals = [...itemTotals, total];
          return (
            <div css={itemStyles} key={`cartProduct-${item.id}`}>
              <Link href={`/products/${item.id}`}>
                <a>
                  <img src={item.image} alt="product" height="90px" />
                </a>
              </Link>
              <Link href={`/products/${item.id}`}>
                <a>
                  <p>{item.title}</p>
                </a>
              </Link>
              <div>
                <p>Amount: {item.amount}</p>
                <button onClick={() => removeItem(item.id)}>
                  Remove from Cart
                </button>
              </div>
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
    </>
  );
}

export async function getServerSideProps(context) {
  // get the list from the database
  const productList = await readAllProducts();
  // get the cookies
  const cookies = JSON.parse(context.req.cookies.cart || '[]');

  // combine product info with cookie amount info
  const cart = productList
    .filter((product) => cookies.some((cookie) => cookie.id === product.id))
    .map((product) => {
      const amountOfItem = cookies.find(
        (cookie) => cookie.id === product.id,
      ).amount;
      return { ...product, amount: amountOfItem };
    });

  return {
    props: {
      cart,
      cookies,
    },
  };
}
