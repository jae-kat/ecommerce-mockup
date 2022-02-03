import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>E-commerce Mockup</title>
        <meta
          name="description"
          content="next.js e-commerce mockup - bootcamp exercise"
        />
      </Head>

      <h1>Welcome</h1>
      <p>This is the online storefront.</p>
    </Layout>
  );
}
