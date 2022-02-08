import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { productList } from '../util/database';

const productsDiv = css`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  max-width: 950px;
  margin: 20px;
`;

const productCardStyles = css`
  width: 300px;
  border: 2px solid #ccc;
`;

export default function Products(props) {
  const [cartProducts, setCartProducts] = useState(props.productsInCart);

  function addToCart(id) {
    // get the current cookies
    const currentCookies = Cookies.get('cart') || '[]';
    const currentCartCookies = JSON.parse(currentCookies);
    // update the cookies
    let newCookies;

    // check if the clicked item is already in the cart
    const productIsInCart = currentCartCookies.some(
      (cookieItem) => id === cookieItem.id,
    );

    // if the product is already in the cart, delete it
    if (productIsInCart) {
      newCookies = currentCartCookies.filter((item) => id !== item.id);
    } // if the product isn't in the cart, add it
    else {
      newCookies = [...currentCartCookies, { id: id, amount: 1 }];
    }

    // set the updated Cookies
    Cookies.set('cart', JSON.stringify(newCookies));
    setCartProducts(newCookies);
  }

  function addOne(id) {
    // get the current cookie value
    const currentCartCookies = JSON.parse(Cookies.get('cart'));
    // add 1 to the amount in the cart
    const newCookies = currentCartCookies.map((cookie) => {
      if (cookie.id === id) {
        return { ...cookie, amount: cookie.amount + 1 };
      } else {
        return cookie;
      }
    });
    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));

    setCartProducts(newCookies);
  }

  function removeOne(id) {
    // get the current cookie value
    const currentCartCookies = JSON.parse(Cookies.get('cart'));

    const productCookie = currentCartCookies.find((cookie) => cookie.id === id);
    let newCookies;

    // delete the product cookie, if the amount goes below zero
    // else remove 1 from the amount in the cart
    if (productCookie.amount - 1 === 0) {
      newCookies = currentCartCookies.filter((cookie) => cookie.id !== id);
    } else {
      newCookies = currentCartCookies.map((cookie) => {
        if (cookie.id === id) {
          return { ...cookie, amount: cookie.amount - 1 };
        } else {
          return cookie;
        }
      });
    }

    // update cookie and state
    Cookies.set('cart', JSON.stringify(newCookies));

    setCartProducts(newCookies);
  }

  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content="products overview - bootcamp exercise"
        />
      </Head>
      <div css={productsDiv}>
        {props.productList.map((product) => {
          const productIsAdded = cartProducts.some(
            (cartItem) => cartItem.id === product.id,
          );
          return (
            <div key={`productsList-${product.id}`} css={productCardStyles}>
              <Link href={`/products/${product.id}`}>
                <a>
                  <img
                    src={product.image}
                    alt="placeholder example"
                    width="300px"
                  />
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </a>
              </Link>
              <button onClick={() => addToCart(product.id)}>
                {productIsAdded ? 'Remove from cart' : 'Add to cart'}
              </button>
              {productIsAdded && (
                <div>
                  <button onClick={() => addOne(product.id)}>+</button>
                  <p>
                    {cartProducts.find((item) => item.id === product.id).amount}
                  </p>
                  <button onClick={() => removeOne(product.id)}>-</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const cartCookies = context.req.cookies.cart || '[]';
  const productsInCart = JSON.parse(cartCookies);

  return {
    props: { productList, productsInCart },
  };
}
