import Head from 'next/head';
import Layout from '../components/Layout';

export default function Products(props) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content="products overview - bootcamp exercise"
        />
      </Head>
    </Layout>
  );
}

export function getServerSideProps() {
  return {
    props: {},
  };
}
