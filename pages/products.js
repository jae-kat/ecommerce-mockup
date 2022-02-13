import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import ModifyCart from '../components/ModifyCart';
import { readAllProducts } from '../util/database';

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
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>
      <div css={productsDiv}>
        {props.productList.map((product) => {
          return (
            <div key={`productList-${product.id}`} css={productCardStyles}>
              <Link href={`/products/${product.id}`}>
                <a>
                  <img
                    src={product.image}
                    alt="placeholder example"
                    width="300px"
                  />
                  <h1>{product.title}</h1>
                  <h2>{product.slogan}</h2>
                  <p>Price per item: {product.price}</p>
                </a>
              </Link>
              <ModifyCart currentProduct={product.id} cookies={props.cookies} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // get the list from the database
  const productList = await readAllProducts();
  // get the cookies
  const cookies = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: {
      productList,
      cookies,
    },
  };
}
