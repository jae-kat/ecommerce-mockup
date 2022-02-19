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
`;

const itemStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 15px;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 7px;
  width: 60vw;
  img {
    border-radius: 7px;
  }
`;

const totalStyles = css`
  margin: 15px;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 7px;
  width: 60vw;
  text-align: right;
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
};
type ProductObj = {
  id: number;
  price: number;
  image: string;
  title: string;
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
        {cart.map((item) => {
          return (
            <div
              css={itemStyles}
              key={`cartProduct-${item.id}`}
              data-test-id={`cart-product-${item.id}`}
            >
              <Link href={`/products/${item.id}`}>
                <a>
                  <img src={item.image} alt="product" height="90px" />
                </a>
              </Link>
              <Link href={`/products/${item.id}`}>
                <a>
                  <p>{item.title}</p>
                </a>
              </Link>
              <p>Price per item: {item.price}</p>
              <div>
                <p>Amount: {item.amount}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  data-test-id={`cart-product-remove-${item.id}`}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          );
        })}
        {cart.length === 0 ? (
          'There are currently no products in your cart'
        ) : (
          <div>
            <div css={totalStyles}>
              Total: <span data-test-id="cart-total">{getCartSum(cart)}</span>
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
