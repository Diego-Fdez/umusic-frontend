import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/NotFoundPage.module.css';
import { Loader, HeadScreen } from '@/components';
import { metaErrorPageContent } from '@/utils/metaContents';

const NotFoundPage = () => {
  const [gif, setGif] = useState('');
  const router = useRouter();

  /* An array of gifs that will be displayed randomly when the page is not found. */
  const gifsErrors = [
    'd2jjuAZzDSVLZ5kI',
    'Bp3dFfoqpCKFyXuSzP',
    'hv5AEBpH3ZyNoRnABG',
    'hLwSzlKN8Fi6I',
  ];

  //It returns a random image from the array of gifsErrors.
  const randomImage = () => {
    return `https://media.giphy.com/media/${
      gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1]
    }/giphy.gif`;
  };

  useEffect(() => {
    setGif(randomImage());
  }, []);

  //It's a function that takes a click event and pushes the user to the home page.
  const handleClick = () => {
    router.push('/');
  };

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={'PageNot Found'} content={metaErrorPageContent} />
      <div className={styles.AppWrapper}>
        <div className={styles.pageErrorStyles}>
          <span className={styles.codeErrorStyles}>Error - 404</span>
          <span className={styles.msgErrorStyles}>
            Sometimes getting lost isn&#39;t that bad
          </span>
          <Image
            className={styles.gifErrorStyles}
            src={gif}
            alt='page-404'
            width={350}
            height={350}
            loading='lazy'
            unoptimized
          />
          <button className={styles.btnErrorPage} onClick={handleClick}>
            Go back to home page!
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default NotFoundPage;
