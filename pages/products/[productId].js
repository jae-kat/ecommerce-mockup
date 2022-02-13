import { css } from '@emotion/react';
import Head from 'next/head';
import ModifyCart from '../../components/ModifyCart';
import { readAllProducts } from '../../util/database';

const productDivStyles = (productColor) => css`
  max-width: 500px;
  border: 2px solid #ccc;
  border: 8px solid ${productColor};
  border-radius: 20px;
  padding: 10px;

  img {
    border-radius: 20px;
  }
`;

export default function ProductId(props) {
  return (
    <>
      <Head>
        <title>{props.product.title}</title>
        <meta name="description" content={props.product.slogan} />
      </Head>
      <div css={productDivStyles(props.product.color)}>
        <img src={props.product.image} alt="the product" width="500px" />
        <h1>{props.product.title}</h1>
        <p>{props.product.description}</p>
        <p>Price per item: {props.product.price}</p>
        <ModifyCart
          currentProduct={props.product.id}
          cookies={props.cookies}
          cartNumber={props.cartNumber}
          setCartNumber={props.setCartNumber}
        />
      </div>
    </>
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
  const cookies = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: {
      product: matchingProduct,
      cookies,
    },
  };
}
