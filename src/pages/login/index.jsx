import { Suspense } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/Login.module.css';
import { Loader } from '@/components';

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <Suspense fallback={<Loader />}>
      <Head>
        <title>Login - UMUSIC</title>
        <meta
          name='description'
          content='Accede a tu cuenta de nuestra app para disfrutar de una experiencia personalizada y segura. Nuestro sistema de inicio de sesión seguro te protege contra el acceso no autorizado, mientras que nuestro proceso de registro fácil te permite crear una cuenta en minutos. Una vez que hayas iniciado sesión, podrás acceder a todas las funciones de nuestra app, desde la creación y gestión de tus listas de reproducción personalizadas hasta el seguimiento de tus preferencias y recomendaciones de música. Además, también puedes acceder a tu historial de escucha, cambiar tu configuración de cuenta y compartir tus listas de reproducción con amigos y familiares. ¡Inicia sesión hoy y comienza a disfrutar de nuestra app al máximo!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta charset='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.loginContainer}>
          <Link href={'/'}>
            <h2 className={styles.loginLogo}>UMUSIC</h2>
          </Link>
          <div className={styles.loginWrapper}>
            <h1 className={styles.loginTitle}>
              Connect to <span className={styles.loginTitleSpan}>U</span>MUSIC
            </h1>
            <p className={styles.loginSubtitle}>
              Sign in, listen to your music, create playlists and share with
              your friends.
            </p>
          </div>
          <div className={styles.loginButtonsContainer}>
            <button onClick={() => loginWithRedirect()}>
              <img
                src='/auth0-icon.svg'
                alt='auth0-logo'
                className={styles.logoImg}
              />
              Login
            </button>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Login;
