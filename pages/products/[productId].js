import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import ModifyCart from '../../components/ModifyCart';
import { readAllProducts } from '../../util/database';

const productDivStyles = css`
  max-width: 500px;
`;

export default function ProductId(props) {
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
        <ModifyCart currentProduct={props.product.id} cookies={props.cookies} />
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
