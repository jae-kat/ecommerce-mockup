import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [cartCookies, setCartCookies] = useState([]);

  // get the cookie value on first render
  useEffect(() => {
    setCartCookies(
      JSON.parse(Cookies.get('cart') || '[]').filter(
        (cookie) => cookie.amount > 0,
      ),
    );
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            box-sizing: border-box;
            font-family: sans-serif;
            color: #5f6266;
            button {
              cursor: pointer;
            }
          }
        `}
      />
      <Layout cartCookies={cartCookies}>
        <Component
          {...pageProps}
          cartCookies={cartCookies}
          setCartCookies={setCartCookies}
        />
      </Layout>
    </>
  );
}

export default MyApp;
