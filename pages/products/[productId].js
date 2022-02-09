import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { readAllProducts } from '../../util/database';

const productDivStyles = css`
  max-width: 500px;
`;

export default function ProductId(props) {
  const [productCookies, setProductCookies] = useState(props.cookies);
  // is the product already in the cart?
  const productIsInCart = productCookies.some(
    (cookie) => cookie.id === props.product.id,
  );

  function addToCart() {
    // get the current cookies
    const currentCartCookies = JSON.parse(Cookies.get('cart') || '[]');

    // update the cookies
    let newCookies;

    // delete if it's already in the cart
    if (productIsInCart) {
      newCookies = currentCartCookies.filter(
        (cookie) => cookie.id !== props.product.id,
      );
    } else {
      // add if it's not yet in the cart
      newCookies = [...currentCartCookies, { id: props.product.id, amount: 1 }];
    }

    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setProductCookies(newCookies);
  }

  function addOne() {
    // get the current amount
    const currentCartCookies = JSON.parse(Cookies.get('cart'));
    // update the amount
    const newCookies = currentCartCookies.map((cookie) => {
      if (cookie.id === props.product.id) {
        return { ...cookie, amount: cookie.amount + 1 };
      } else {
        return cookie;
      }
    });
    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setProductCookies(newCookies);
  }

  function removeOne() {
    // get the current amount
    const currentCartCookies = JSON.parse(Cookies.get('cart'));

    let newCookies;
    const productCookie = currentCartCookies.find(
      (cookie) => cookie.id === props.product.id,
    );

    // if the amount minus one is zero, delete the item from the cookies
    // else update the cookies
    if (productCookie.amount - 1 === 0) {
      newCookies = currentCartCookies.filter(
        (cookie) => cookie.id !== props.product.id,
      );
    } else {
      newCookies = currentCartCookies.map((cookie) => {
        if (cookie === productCookie) {
          return { ...cookie, amount: cookie.amount - 1 };
        } else {
          return cookie;
        }
      });
    }

    // update cookies and state
    Cookies.set('cart', JSON.stringify(newCookies));
    setProductCookies(newCookies);
  }

  return (
    <Layout>
      <Head>
        <title>{props.product.title}</title>
        <meta name="description" content={props.product.slogan} />
      </Head>
      <div css={productDivStyles}>
        <img src={props.product.image} alt="the product" width="500px" />
        <h1>{props.product.title}</h1>
        <p>{props.product.description}</p>
        <p>Price per item: {props.product.price}</p>
        <button onClick={() => addToCart()}>
          {productIsInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
        {productIsInCart && (
          <div>
            <button onClick={() => addOne()}>+</button>
            <p>
              {
                productCookies.find((cookie) => cookie.id === props.product.id)
                  .amount
              }
            </p>
            <button onClick={() => removeOne()}>-</button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // get the productList from the database
  const productList = await readAllProducts();

  // find out via the url which product is displayed
  const productId = Number(context.query.productId);

  const matchingProduct = productList.find(
    (singleProduct) => productId === singleProduct.id,
  );

  // get the cart cookies
  const cartCookies = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: {
      product: matchingProduct,
      cookies: cartCookies,
    },
  };
}
