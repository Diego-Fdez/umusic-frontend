import Link from "next/link";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import userStore from "@/store/userStore";
import styles from "./styles/NavModal.module.css";

const NavModal = ({ isOpen, setIsOpen, modalOpen, setModalOpen }) => {
  const { logout } = useAuth0();
  const isAuthenticated = userStore((state) => state.isAuthenticated);

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
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
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
