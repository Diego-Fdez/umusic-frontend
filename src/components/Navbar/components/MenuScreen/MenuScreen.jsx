import Link from "next/link";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import userStore from "@/store/userStore";
import styles from "./styles/NavModal.module.css";
import persistedVideoStore from "@/store/persistedVideoStore";

const NavModal = ({ isOpen, setIsOpen, modalOpen, setModalOpen }) => {
  const { logout, isAuthenticated } = useAuth0();
  const removeUserInfo = userStore((state) => state.removeUserInfo);
  const removeCurrentPlaylist = persistedVideoStore(
    (state) => state.removeCurrentPlaylist
  );

  //logOut from  auth0 and remove user info from store
  const handlerLogOut = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
    removeUserInfo();
    removeCurrentPlaylist();
  };

  return (
    <div
      className={styles.navbarModalContainer}
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <ul className={styles.navbarModalList}>
        <li className={styles.navbarModalListItem}>
          {isAuthenticated ? (
            <button onClick={() => handlerLogOut()}>
              <Image
                src='/logout-icon.svg'
                alt='logout-icon'
                className={styles.navbarModalItemImg}
                width={24}
                height={24}
                loading='lazy'
              />
              <p>Logout</p>
            </button>
          ) : (
            <Link href={"/login"} onClick={() => setIsOpen(!isOpen)}>
              <Image
                src='/login-icon.svg'
                alt='login-icon'
                className={styles.navbarModalItemImg}
                width={24}
                height={24}
                loading='lazy'
              />
              <p>Login</p>
            </Link>
          )}
        </li>
        <li className={styles.navbarModalListItem}>
          <Link href={"/profile"} onClick={() => setIsOpen(!isOpen)}>
            <Image
              src='/config-icon.svg'
              alt='configurations-icon'
              className={styles.navbarModalItemImg}
              width={24}
              height={24}
              loading='lazy'
            />
            <p>Configurations</p>
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className={styles.navbarModalListItem}>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setModalOpen(!modalOpen);
                }}
              >
                <Image
                  src='/qrcode-icon.svg'
                  alt='qrcode-icon'
                  className={styles.navbarModalItemImg}
                  width={24}
                  height={24}
                  loading='lazy'
                />
                <p>Generate QR</p>
              </button>
            </li>
            <li className={styles.navbarModalListItem}>
              <Link href={"/room"} onClick={() => setIsOpen(!isOpen)}>
                <Image
                  src='/music-list-icon.svg'
                  alt='music-list-icon'
                  className={styles.navbarModalItemImg}
                  width={24}
                  height={24}
                  loading='lazy'
                />
                <p>My Playlists</p>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default NavModal;
