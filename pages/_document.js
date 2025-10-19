import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <body style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
