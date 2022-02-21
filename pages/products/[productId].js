import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import ModifyCart from '../../components/ModifyCart';
import { readAllProducts } from '../../util/database';

const productDivStyles = css`
  max-width: 950px;
  padding: 1vw;
  h1 {
    text-align: center;
  }
  a {
    text-align: left;
    display: inline-block;
    text-decoration: none;
    color: #5f6266;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0 0.3vw;
    :hover {
      background-color: #48695a66;
    }
  }
  img {
    border-radius: 6px;
    width: 40%;
    object-fit: cover;
  }
  .positionItems {
    margin-top: 5vw;
    display: flex;
    gap: 5vw;
    text-align: justify;
    @media screen and (max-width: 750px) {
      flex-direction: column;
      img {
        width: 100%;
      }
    }
  }
`;

export default function ProductId(props) {
  return (
    <>
      <Head>
        <title>{props.product.title}</title>
        <meta
          name="description"
          content={`Learn more about our products: ${props.product.title}`}
        />
      </Head>
      <div css={productDivStyles}>
        <Link href="/products">
          <a aria-label="go back to the shop">🠔</a>
        </Link>
        <h1>{props.product.title}</h1>
        <div className="positionItems">
          <img
            src={props.product.image}
            alt={props.product.alt}
            width="500px"
            data-test-id="product-image"
          />
          <div>
            <p>{props.product.description}</p>
            <p>
              € <span data-test-id="product-price">{props.product.price}</span>
              .00
            </p>
            <ModifyCart
              currentProduct={props.product.id}
              cartCookies={props.cartCookies}
              setCartCookies={props.setCartCookies}
            />
          </div>
        </div>
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
