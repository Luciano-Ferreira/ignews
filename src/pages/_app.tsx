// import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import '../styles/global.scss';

function MyApp({ 
    Component, 
    pageProps: { session, ...pageProps } 
  }): JSX.Element {
  return (
    <NextAuthProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
