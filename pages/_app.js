import { css, Global } from '@emotion/react';
import { useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [cartNumber, setCartNumber] = useState([]);

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
      <Layout cartNumber={cartNumber} setCartNumber={setCartNumber}>
        <Component
          {...pageProps}
          cartNumber={cartNumber}
          setCartNumber={setCartNumber}
        />
      </Layout>
    </>
  );
}

export default MyApp;
