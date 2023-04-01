import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/Navbar.module.css';
import { MenuScreen, QRScreenModal, SearchBar } from './components';
import userStore from '@/store/userStore';

const Navbar = () => {
  const userInfo = userStore((state) => state.userInfo);
  const isAuthenticated = userStore((state) => state.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  /**
   * If the modalRef.current is equal to the event target, then set the isOpen state to false and set
   * the modalOpen state to false
   */
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsOpen(false);
      setModalOpen(false);
    }
  };

  /* A function that is called when the user presses the escape key. If the user presses the escape
  key, then the modalOpen state is set to false and the isOpen state is set to false. */
  const keyPress = useCallback(
    (e) => {
      if ((e.key === 'Escape' && modalOpen) || (e.key === 'Escape' && isOpen)) {
        setIsOpen(false);
        setModalOpen(false);
      }
    },
    [isOpen, setIsOpen, modalOpen, setModalOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <header
      className={styles.navbarContainer}
      ref={modalRef}
      onClick={closeModal}
    >
      <div className={styles.logoContainer}>
        <Link href={'/'}>
          <img
            src='/umusic-logo.webp'
            alt='umusic-logo'
            className={styles.logoImg}
          />
          <h1 className={styles.logo}>UMUSIC</h1>
        </Link>
      </div>
      <SearchBar />
      <nav className={styles.profileContainer}>
        <button
          className={styles.profileButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={isAuthenticated ? userInfo?.picture : '/default-image.png'}
            alt={isAuthenticated ? userInfo?.name : 'empty-profile-image'}
            title={isAuthenticated ? userInfo?.name : 'Profile'}
            className={styles.profileImage}
            width={35.2}
            height={35.2}
            loading='lazy'
          />
        </button>
        <MenuScreen
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </nav>
      <QRScreenModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </header>
  );
};

export default Navbar;
