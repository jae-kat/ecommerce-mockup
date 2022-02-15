import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
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
  flex: 1 1 300px;
  border: 4px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  filter: grayscale(80%);
  a {
    text-decoration: none;
    color: #5f6266;
  }
  .add {
    display: flex;
    gap: 3%;
    align-items: flex-start;
    justify-content: space-around;
    img {
      max-width: 150px;
      flex: 1 1 150px;
      border-radius: 10px;
    }
    .modifyStyles {
      width: 60%;
      flex: 2 1 150px;
    }
  }
  h1 {
    text-align: center;
  }
  :hover {
    border: 4px solid ${productColor};
    outline: 2px solid ${productColor}A6;
    filter: grayscale(0);
  }
`;

export default function Products(props) {
  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>
      <h1>Our Products</h1>
      <div css={productsDiv}>
        {props.productList.map((product) => {
          return (
            <div
              key={`productList-${product.id}`}
              css={productCardStyles(product.color)}
              data-test-id={`product-${product.id}`}
            >
              <Link href={`/products/${product.id}`}>
                <a>
                  {' '}
                  <h1>{product.title}</h1>
                  <div className="add">
                    <Image
                      src={product.image}
                      alt="placeholder example"
                      width="150px"
                      height="225px"
                    />{' '}
                  </div>
                  <p>Price per door: {product.price}</p>
                </a>
              </Link>
              <ModifyCart
                className="modifyStyles"
                currentProduct={product.id}
                cookies={props.cookies}
                cartCookies={props.cartCookies}
                setCartCookies={props.setCartCookies}
              />
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
