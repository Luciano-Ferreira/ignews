import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
          <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all  the publications<br />
            <span>for {product.amount} months</span>
          </p>
          <SubscribeButton />
        </section>
        
        <img className={styles.avatar} src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Ir6CHEEKGF7k9nrCNl1aePg')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
