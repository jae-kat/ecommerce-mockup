import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { productList } from '../../util/database';

const productDivStyles = css`
  max-width: 500px;
`;

export default function ProductId(props) {
  return (
    <Layout>
      <Head>
        <title>{props.product.name}</title>
      </Head>
      <div css={productDivStyles}>
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
