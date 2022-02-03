import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            box-sizing: border-box;
          }
        `}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
