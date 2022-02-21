import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { readAllProducts } from '../util/database';

const goBack = css`
  text-decoration: none;
  color: #5f6266;
  font-size: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 0.3vw;
  :hover {
    background-color: #48695a66;
    cursor: pointer;
  }
`;

const orderStyles = css`
  li {
    list-style: none;
  }
`;

const inputFields = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  button {
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
const inputStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  label {
    border-radius: 6px;
    padding: 3px;
    input,
    select {
      border-radius: 6px;
      background-color: #e1e1e1;
      border: none;
      padding: 3px;
      margin: 3px 3px 0 0;
    }
  }
`;

export default function Checkout(props) {
  const router = useRouter();

  function submitForm(event) {
    event.preventDefault();
    Cookies.set('cart', '[]');
    props.setCartCookies([]);
    router.push('/thankyou').catch((error) => console.log(error));
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="Confirm your order and shipping information"
        />
      </Head>
      <Link href="/cart">
        <a css={goBack} aria-label="go back to the shopping cart">
          🠔
        </a>
      </Link>
      <h1>Checkout</h1>
      <div css={orderStyles}>
        <p>Your Order: </p>
        <ul>
          {props.cart.map((item) => (
            <li key={`checkout-${item.id}`}>
              {item.amount}x {item.title} for €
              {(item.price * item.amount).toFixed(2)}
            </li>
          ))}
        </ul>

        <p>
          Your total: €
          {props.cart.reduce((previous, item) => {
            return previous + item.price * item.amount;
          }, 0)}{' '}
        </p>
      </div>
      <form css={inputFields} onSubmit={(event) => submitForm(event)}>
        <div css={inputStyles}>
          <h2 id="contact">Contact</h2>
          <label>
            First name <br />
            <input required aria-labelledby="contact" />
          </label>
          <label>
            Last Name <br />
            <input required aria-labelledby="contact" />
          </label>
          <label>
            E-mail
            <br />
            <input type="email" required aria-labelledby="contact" />
          </label>
        </div>
        <div css={inputStyles}>
          <h2 id="address">Shipping Address</h2>
          <label>
            Street and Number
            <br />
            <input required aria-labelledby="address" />
          </label>
          <label>
            City
            <br />
            <input required aria-labelledby="address" />
          </label>
          <label>
            Postal Code
            <br />
            <input required aria-labelledby="address" />
          </label>
          <label>
            Country <br />
            <select required aria-labelledby="address">
              <option>Austria</option>
              <option>Germany</option>
              <option>Switzerland</option>
            </select>
          </label>
        </div>
        <div css={inputStyles}>
          <h2 id="payment">Payment</h2>
          <label>
            Credit Card Type <br />
            <select required aria-labelledby="payment">
              <option>MasterCard</option>
              <option>Visa</option>
              <option>American Express</option>
              <option>Diner's Club</option>
            </select>
          </label>
          <label>
            Credit Card Number
            <br />
            <input required aria-labelledby="payment" />
          </label>
          <label>
            Expiration date <br />
            <select required aria-labelledby="payment" aria-label="month">
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <select required aria-labelledby="payment" aria-label="year">
              <option>{new Date().getFullYear()}</option>
              <option>{new Date().getFullYear() + 1}</option>
              <option>{new Date().getFullYear() + 2}</option>
              <option>{new Date().getFullYear() + 3}</option>
              <option>{new Date().getFullYear() + 4}</option>
            </select>
          </label>
          <label>
            Security Code
            <br />
            <input required aria-labelledby="payment" maxLength="3" />
          </label>
        </div>
        <button>Confirm Order</button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  // get cookies and productList
  const cookies = JSON.parse(context.req.cookies.cart);
  const productList = await readAllProducts();
  // find the products in the cart and the amount
  const cartItems = productList.filter((product) => {
    return cookies.some((cookie) => cookie.id === product.id);
  });
  // add the amount to the list of products in the cart
  const cart = cartItems.map((item) => {
    const amount = cookies.find((cookie) => cookie.id === item.id);
    return { ...item, amount: amount.amount };
  });

  return {
    props: {
      cart,
    },
  };
}
