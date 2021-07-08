import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from '../styles/home.module.scss'

export default function Home() {
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
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton/>
        </section>
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>  
  )
}
