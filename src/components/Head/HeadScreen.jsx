import Head from 'next/head';

const HeadScreen = ({ title, content }) => {
  return (
    <Head>
      <title>{`${title} - UMUSIC`}</title>
      <meta name='description' content={content} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='robots' content='index, follow' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta charset='utf-8' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default HeadScreen;
