import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'

import { getPrismicClient } from '../../services/prismic'

import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | IGNews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a>
                        <time>01 de Julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>Breve paragrafo do post para demonstrar o inicio do conteúdo do post.</p>
                    </a>
                    <a>
                        <time>01 de Julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>Breve paragrafo do post para demonstrar o inicio do conteúdo do post.</p>
                    </a>
                    <a>
                        <time>01 de Julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>Breve paragrafo do post para demonstrar o inicio do conteúdo do post.</p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    const response = await prismic.query([
        Prismic.predicates.at('document.type','post')
    ],{
        fetch: ['post.title','post.content'],
        pageSize: 100
    })

    console.log(response)

    return {
        props: {

        }
    }
}