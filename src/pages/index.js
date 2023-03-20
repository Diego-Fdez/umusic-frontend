import { useEffect } from 'react';
import Head from 'next/head';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import styles from '@/styles/Home.module.css';
import { CategoryScreen, Loader, Navbar } from '@/components';
import videoStore from '@/store/videoStore';
import { VideoCard } from './Home/components';
import { Suspense } from 'react';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import userStore from '@/store/userStore';

export default function Home() {
  const { user, isAuthenticated } = useAuth0();
  const { fetchFromDB, baseURL } = UseFetchFromDB();
  const addUser = userStore((state) => state.addUser);
  const dbUser = userStore((state) => state.user);
  const videos = videoStore((state) => state.videos);
  const loading = videoStore((state) => state.loading);
  console.log(dbUser);

  //It takes the user's data from Auth0 and sends it to the backend to be stored in the database.
  const loginFromDB = async () => {
    const setData = {
      id: user?.sub,
      email: user?.email,
      name: user?.name,
      picture: user?.picture,
    };

    try {
      const result = await fetchFromDB(`${baseURL}/login`, 'POST', setData);
      addUser(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && dbUser?.userInfo?.id === '') {
      loginFromDB();
    }
  }, [isAuthenticated, dbUser?.userInfo?.id]);

  return (
    <Suspense fallback={<Loader />}>
      <Head>
        <title>Home - UMUSIC</title>
        <meta
          name='description'
          content='¿Estás buscando una forma de crear y compartir listas de reproducción de música con amigos, familiares o compañeros de trabajo? ¡Nuestra web app es la solución perfecta! Con nuestra aplicación, puedes crear fácilmente listas de reproducción personalizadas con tus canciones favoritas, y luego compartirlas con tus amigos a través de un enlace o mediante la integración con las redes sociales. Además, puedes colaborar con tus amigos para crear listas de reproducción compartidas, lo que significa que todos pueden agregar y eliminar canciones en tiempo real. Ya sea que estés organizando una fiesta, planificando un viaje por carretera o simplemente compartiendo tu música favorita, nuestra web app hace que sea fácil crear y compartir listas de reproducción. ¡Prueba nuestra aplicación hoy y comienza a disfrutar de la música con tus amigos!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta charset='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Navbar />
      <CategoryScreen />
      {loading && <Loader />}
      <main className={styles.homeContainer}>
        {videos?.map((video) => (
          <VideoCard key={video?.video?.videoId} video={video.video} />
        ))}
      </main>
    </Suspense>
  );
}
