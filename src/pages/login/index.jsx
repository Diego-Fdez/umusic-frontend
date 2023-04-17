import { Suspense } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./styles/Login.module.css";
import { Loader, GoogleAnalytics, HeadScreen } from "@/components";
import { metaLoginPageContent } from "@/utils/metaContents";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={"Login"} content={metaLoginPageContent} />
      <GoogleAnalytics />
      <div className={styles.loginContainer}>
        <Link href={"/"}>
          <h2 className={styles.loginLogo}>UMUSIC</h2>
        </Link>
        <div className={styles.loginWrapper}>
          <h1 className={styles.loginTitle}>
            Connect to <span className={styles.loginTitleSpan}>U</span>MUSIC
          </h1>
          <p className={styles.loginSubtitle}>
            Sign in, listen to your music, create playlists and share with your
            friends.
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
    </Suspense>
  );
};

export default Login;
