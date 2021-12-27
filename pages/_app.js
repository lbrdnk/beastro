import Head from "next/head";

import '../styles/globals.css'
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" /> */}

        {/* disable autorotate */}
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled"></meta>

        {/* Kosugi font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Kosugi&display=swap" rel="stylesheet" />

      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
