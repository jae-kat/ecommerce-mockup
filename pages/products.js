import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import ModifyCart from '../components/ModifyCart';
import { readAllProducts } from '../util/database';

const productsDiv = css`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
  max-width: 950px;
  margin: 20px;
`;

const productCardStyles = (productColor) => css`
  width: 400px;
  border: 2px solid #ccc;
  border: 8px solid ${productColor};
  border-radius: 20px;
  padding: 10px;
  :hover {
    outline: 6px solid ${productColor}A6;
  }
  a {
    text-decoration: none;
    color: #5f6266;
  }
  img {
    width: 200px;
    border-radius: 20px;
  }
  .add {
    display: flex;
  }
  h1 {
    text-align: center;
  }
`;

export default function Products(props) {
  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>
      <div css={productsDiv}>
        {props.productList.map((product) => {
          return (
            <div
              key={`productList-${product.id}`}
              css={productCardStyles(product.color)}
            >
              <Link href={`/products/${product.id}`}>
                <a>
                  <h1>{product.title}</h1>
                </a>
              </Link>
              <div className="add">
                <Link href={`/products/${product.id}`}>
                  <a>
                    {' '}
                    <img src={product.image} alt="placeholder example" />{' '}
                  </a>
                </Link>
                <ModifyCart
                  currentProduct={product.id}
                  cookies={props.cookies}
                  cartNumber={props.cartNumber}
                  setCartNumber={props.setCartNumber}
                />
              </div>
              <h2>{product.slogan}</h2>
              <p>Price per item: {product.price}</p>
            </div>
          );
        })}
      </div>
    </>
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
