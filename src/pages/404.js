import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/NotFoundPage.module.css';
import { GoogleAnalytics, Loader, HeadScreen } from '@/components';

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
      <HeadScreen
        title={'PageNot Found'}
        content={`Lo sentimos, la página que estás buscando no se puede encontrar en nuestro sitio web. Es posible 
        que la página haya sido eliminada, que el enlace esté roto o que hayas escrito mal la dirección web. 
        Por favor, revisa la URL y asegúrate de que esté escrita correctamente. Si el problema persiste, por favor 
        ponte en contacto con nuestro equipo de soporte técnico para obtener ayuda. Mientras tanto, por favor sigue 
        explorando nuestro sitio web para descubrir más sobre nuestras características y servicios. ¡Gracias por 
        visitarnos!`}
      />
      <GoogleAnalytics />
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
