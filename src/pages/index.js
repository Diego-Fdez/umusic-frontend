import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "@/styles/Home.module.css";
import {
  CategoryScreen,
  Loader,
  Navbar,
  VideoCard,
  GoogleAnalytics,
} from "@/components";
import videoStore from "@/store/videoStore";
import userStore from "@/store/userStore";
import persistedVideoStore from "@/store/persistedVideoStore";
import { metaHomeContent } from "@/utils/metaContents";
import UseVideos from "@/hooks/useVideos";

export default function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const addUserToken = userStore((state) => state.addUserToken);
  const addUserInfo = userStore((state) => state.addUserInfo);
  const userInfo = userStore((state) => state.userInfo);
  const setIsAuthenticated = userStore((state) => state.setIsAuthenticated);
  const userToken = userStore((state) => state.userToken);
  const videos = videoStore((state) => state.videos);
  const currentPlaylist = persistedVideoStore((state) => state.currentPlaylist);
  const keyword = videoStore((state) => state.keyword);

  const { saveVideosState, isLoading, data, handlerGetDefaultPlaylist } =
    UseVideos(`v1/search/?q=${keyword}&hl=es&gl=CR`);

  useEffect(() => {
    saveVideosState();
  }, [isLoading, data]);

  //This function will get the Auth0 token
  async function getAuth0Token() {
    const token = await getAccessTokenSilently();
    addUserToken(token);
  }

  useEffect(() => {
    /* Checking if the user is authenticated and if the userToken is not null. If it is not null, it
    will add the userToken and the user to the userStore. */
    if ((userToken === "") & isAuthenticated) {
      getAuth0Token();

      /* Checking if the user is authenticated and if it is, it will add the user to the userStore. */
      if (isAuthenticated & !userInfo?.sub) addUserInfo(user);

      /* Setting the isAuthenticated state to true. */
      if (isAuthenticated & !userInfo?.sub) setIsAuthenticated(true);
    }
  }, [userToken, isAuthenticated, userInfo]);

  useEffect(() => {
    handlerGetDefaultPlaylist();
  }, [userToken, currentPlaylist]);

  return (
    <>
      <Head>
        <title>Home - UMUSIC</title>
        <meta name='description' content={metaHomeContent} />
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
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.homeContainer}>
          {videos?.length <= 0 ? (
            <div className={styles.noVideos}>
              <Image
                src='/men-crying.png'
                alt='men-crying'
                width={300}
                height={300}
                loading='lazy'
              />
              <h3>No videos to show you, please search something</h3>
            </div>
          ) : (
            <>
              {videos?.map((video) => (
                <VideoCard key={video?.video?.videoId} video={video.video} />
              ))}
            </>
          )}
        </main>
      )}
    </>
  );
}
