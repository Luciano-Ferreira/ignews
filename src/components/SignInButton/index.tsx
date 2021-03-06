import { FaGoogle } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

export default function SignInButton() {
    const { data: session, status } = useSession();
    return session && status === 'authenticated' ? (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGoogle color="#04d361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('google')}
        >
            <FaGoogle color="#eba417" />
            Sign in with Google Account
        </button>
    );


    {/*session && status === 'authenticated' && 
    (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGoogle color="#04d361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    );

    session === undefined && status=== 'loading' &&
    (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGoogle color="#ccc" />
            Loading...
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    );

    session === null && status === 'unauthenticated' &&
    (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('google')}
        >
            <FaGoogle color="#eba417" />
            Sign in with Google Account
        </button>
    )*/}
}