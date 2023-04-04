import { useEffect, Suspense } from 'react';
import Head from 'next/head';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import styles from '@/styles/Home.module.css';
import {
  CategoryScreen,
  Loader,
  Navbar,
  VideoCard,
  GoogleAnalytics,
} from '@/components';
import videoStore from '@/store/videoStore';
import userStore from '@/store/userStore';
import { useFetch } from '@/hooks/useFetchFromYoutube';

let socket;

export default function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { loading } = useFetch();
  const addUserToken = userStore((state) => state.addUserToken);
  const addUserInfo = userStore((state) => state.addUserInfo);
  const setIsAuthenticated = userStore((state) => state.setIsAuthenticated);
  const userToken = userStore((state) => state.userToken);
  const videos = videoStore((state) => state.videos);
  const currentPlaylist = videoStore((state) => state.currentPlaylist);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER);
    socket.emit('joinRoom', currentPlaylist?._id);
  }, []);

  //This function will get the Auth0 token
  async function getAuth0Token() {
    const token = await getAccessTokenSilently();
    addUserToken(token);
  }

  useEffect(() => {
    /* Checking if the user is authenticated and if the userToken is not null. If it is not null, it
    will add the userToken and the user to the userStore. */
    if (userToken === '' && isAuthenticated) {
      getAuth0Token();

      /* Checking if the user is authenticated and if it is, it will add the user to the userStore. */
      isAuthenticated && addUserInfo(user);

      /* Setting the isAuthenticated state to true. */
      isAuthenticated && setIsAuthenticated(true);
    }
  }, [userToken, isAuthenticated]);

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
        <meta
          name='google-site-verification'
          content='d8QBV8WsM4wcvC0-yzY7XENEKpjF4NpaAmUQpv_3KF8'
        />
      </Head>
      <GoogleAnalytics />
      <Navbar />
      <CategoryScreen />
      {loading ? (
        <Loader />
      ) : (
        <main className={styles.homeContainer}>
          {videos?.map((video) => (
            <VideoCard
              key={video?.video?.videoId}
              video={video.video}
              socket={socket}
            />
          ))}
        </main>
      )}
    </Suspense>
  );
}
