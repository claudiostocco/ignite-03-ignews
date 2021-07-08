import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
    let isUserLogged = true

    const handleTogleUserLogged = () => {
        isUserLogged = !isUserLogged
    }

    return isUserLogged ? 
    (
        <button type="button" className={styles.signInButton} onClick={handleTogleUserLogged}>
            <FaGithub color="#04d361"/>
            Sign in with GitHub
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#eba417"/>
            Sign in with GitHub
        </button>
    )
}