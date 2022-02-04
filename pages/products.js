import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { productList } from '../util/database';

const productCardStyles = css`
  width: 500px;
`;

export default function Products(props) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content="products overview - bootcamp exercise"
        />
      </Head>
      <p>
        {props.productList.map((product) => {
          return (
            <div key={`productsList-${product.id}`} css={productCardStyles}>
              <Link href={`/products/${product.id}`}>
                <a>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </a>
              </Link>
            </div>
          );
        })}
      </p>
    </Layout>
  );
}

export function getServerSideProps() {
  return {
    props: { productList: productList },
  };
}
