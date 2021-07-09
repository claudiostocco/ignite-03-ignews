import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { SubscribeButton } from '../components/SubscribeButton'

import styles from '../styles/home.module.scss'
import { stripe } from '../services/stripe'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
 
  return (
    <>
      <Head>
        <title>IG News | Inicio</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey,  wellcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>  
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JBGk9EhCqzvapLKqUAZBO8h',{
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    }
  }
}