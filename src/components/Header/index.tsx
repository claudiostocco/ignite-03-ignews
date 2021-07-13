import { SignInButton } from './SignInButton'
import styles from './styles.module.scss'
// import Image from 'next/image'
import React from 'react'
import { ActiveLink } from './ActiveLink'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.svg" alt="ig news" />
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}