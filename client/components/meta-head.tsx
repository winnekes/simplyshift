import Head from "next/head";

export const MetaHead = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
      />

      <meta name="theme-color" content="#48BB78" />
      <meta
        name="description"
        content="SimplyShift is a simple shift scheduler. Create, manage and track your shifts - for nurses, doctors, firefighters and everyone who does not work the traditional 9-5."
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/manifest.json" />
      <link href="/favicon.ico" rel="icon" />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-startup-image" href="/apple-icon-180x180.png" />
      <title>SimplyShift, your simple shift scheduler</title>
    </Head>
  );
};
