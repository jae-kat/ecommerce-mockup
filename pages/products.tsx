import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { addToCart } from '../util/addToCart';
import { readAllProducts } from '../util/database';

// css
const h1Styles = css`
  color: #48695a;
`;
const productsDiv = css`
  display: flex;
  flex-flow: row wrap;
  gap: 2vw;
  max-width: 90vw;
  margin: 20px;
`;

const productCardStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 300px;
  border-radius: 6px;
  filter: grayscale(60%);
  a {
    text-decoration: none;
    color: #5f6266;
  }
  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2vh;
    img {
      flex: 1 1 auto;
      object-fit: cover;
      border-radius: 6px;
    }
  }
  :hover {
    filter: grayscale(0);
  }
  .more {
    padding: 0.8vw 1vw;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 1vw;
    background-color: transparent;
    :hover {
      background-color: #48695acc;
      border: 1px solid #48695acc;
      color: white;
    }
  }
  .buy {
    padding: 0.8vw 1vw;
    background-color: #48695a;
    border: 1px solid #48695a;
    border-radius: 6px;
    letter-spacing: 0.1rem;
    color: white;
    :hover {
      background-color: #48695acc;
    }
  }
`;

// typescript types
type ProductObj = {
  id: number;
  image: string;
  price: number;
  title: string;
  alt: string;
};
type Cookie = {
  id: number;
  amount: number;
};
type Props = {
  productList: ProductObj[];
  setCartCookies: Dispatch<SetStateAction<Cookie[]>>;
};

export default function Products(props: Props) {
  function addItem(id: number) {
    const newCookies: Cookie[] = addToCart(id);
    // update the state
    props.setCartCookies(newCookies);
    // update the cookies
    Cookies.set('cart', JSON.stringify(newCookies));
  }

  return (
    <>
      <Head>
        <title>Interior Collection Spring 2022</title>
        <meta
          name="description"
          content="Spring Collection 2022 - Guts & Jannsen"
        />
      </Head>
      <h1 css={h1Styles}>Spring Collection 2022</h1>
      <div css={productsDiv}>
        {props.productList.map((product) => {
          return (
            <div key={`productList-${product.id}`} css={productCardStyles}>
              <Link href={`/products/${product.id}`}>
                <a data-test-id={`product-${product.id}`} className="link">
                  {' '}
                  <h2>{product.title}</h2>
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width="500px"
                    height="500px"
                  />{' '}
                  <p>€ {product.price}.00</p>
                </a>
              </Link>
              <div>
                <Link href={`/products/${product.id}`}>
                  <a className="more" aria-label={`go to ${product.title}`}>
                    Lean more ➞
                  </a>
                </Link>
                <button onClick={() => addItem(product.id)} className="buy">
                  Buy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // get the products from the database
  const productList: ProductObj[] = await readAllProducts();

  return {
    props: {
      productList,
    },
  };
}
