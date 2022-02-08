import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { productList } from '../../util/database';

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
        <title>{props.product.name}</title>
      </Head>
      <div css={productDivStyles}>
        <img src={props.product.image} alt="the product" width="500px" />
        <h1>{props.product.name}</h1>
        <p>{props.product.description}</p>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const productId = context.query.productId;
  const matchingProduct = productList.find(
    (singleProduct) => productId === singleProduct.id,
  );

  return {
    props: {
      product: matchingProduct,
    },
  };
}
