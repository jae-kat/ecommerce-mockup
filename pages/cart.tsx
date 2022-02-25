import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { readAllProducts } from '../util/database';
import { getCartSum } from '../util/getCartSum';
import { removeFromCart } from '../util/removeFromCart';

const cartPageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .goBack {
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
`;

const itemStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 2vh 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 65vw;
  @media screen and (max-width: 1090px) {
    width: 70vw;
  }
  @media screen and (max-width: 1090px) and (min-width: 700px) {
    width: 80vw;
  }
  @media screen and (max-width: 700px) {
    width: 95vw;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }

  align-items: center;
  img {
    border-radius: 6px;
    margin: 2px;
  }
  a {
    color: #5f6266;
  }
  .amount {
    text-align: center;
  }
  .remove {
    background-color: transparent;
    padding: 0.1vw;
    border: 1px solid #ccc;
    border-radius: 6px;
    img {
      width: 20px;
    }
    :hover {
      background-color: #48695a66;
    }
  }
`;

const totalStyles = css`
  margin: 15px;
  width: 60vw;
  text-align: right;
  padding: 2vw;
  button {
    margin-top: 1.5vw;
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

type Props = {
  cart: CartObj[];
  setCartCookies: Dispatch<SetStateAction<Cookie[]>>;
};

type Cookie = {
  id: number;
  amount: number;
};
type CartObj = {
  id: number;
  amount: number;
  price: number;
  image: string;
  title: string;
  alt: string;
};
type ProductObj = {
  id: number;
  price: number;
  image: string;
  title: string;
  alt: string;
};

export default function Cart(props: Props) {
  const [cart, setCart] = useState<CartObj[]>(props.cart);

  function removeItem(id: number) {
    // update the cart state variable
    const updatedCartItems: CartObj[] = cart.filter(
      (item: CartObj) => item.id !== id,
    );
    setCart([...updatedCartItems]);
    // update the cookies
    const newCookies = removeFromCart(id);
    Cookies.set('cart', JSON.stringify(newCookies));
    // update the cartNumber for the header
    props.setCartCookies(newCookies);
  }

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="View your shopping cart" />
      </Head>
      <div css={cartPageStyles}>
        <Link href="/products">
          <a className="goBack" aria-label="go back to the shop">
            🠔
          </a>
        </Link>
        {cart.map((item) => {
          return (
            <div
              css={itemStyles}
              key={`cartProduct-${item.id}`}
              data-test-id={`cart-product-${item.id}`}
            >
              <Link href={`/products/${item.id}`}>
                <a data-test-id={`go-to-product-${item.id}`}>
                  <img src={item.image} alt={item.alt} height="150vh" />
                </a>
              </Link>
              <Link href={`/products/${item.id}`}>
                <a>
                  <p>{item.title}</p>
                </a>
              </Link>
              <p>Price per item: €{item.price.toFixed(2)}</p>
              <div className="amount">
                <p>Amount: {item.amount}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Delete item from cart"
                  className="remove"
                  data-test-id={`cart-product-remove-${item.id}`}
                >
                  <img src="/delete.svg" alt="" />
                </button>
              </div>
            </div>
          );
        })}
        {cart.length === 0 ? (
          <p> There are currently no products in your cart</p>
        ) : (
          <div css={totalStyles}>
            <div>
              Total: €{' '}
              <span data-test-id="cart-total">
                {getCartSum(cart).toFixed(2)}
              </span>
            </div>
            <Link href="/checkout">
              <a>
                <button data-test-id="cart-checkout">Go to Checkout</button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get the list from the database
  const productList: ProductObj[] = await readAllProducts();
  // get the cookies
  const cookies: Cookie[] = JSON.parse(context.req.cookies.cart || '[]');

  // combine product info with cookie amount info
  const cart: CartObj[] = productList
    .filter((product) =>
      cookies.some((cookie) => cookie.id === product.id && cookie.amount > 0),
    )
    .map((product) => {
      const findItem = cookies.find((cookie) => cookie.id === product.id);
      if (!findItem) {
        throw new Error('Type Error in cart page');
      }
      const amountOfItem = findItem.amount;
      return { ...product, amount: amountOfItem };
    });

  return {
    props: {
      cart,
    },
  };
}
