import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-HZ616JNHFY'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HZ616JNHFY');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
