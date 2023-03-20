import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/Navbar.module.css';
import { MenuScreen, QRScreenModal, SearchBar } from './components';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsOpen(false);
      setModalOpen(false);
    }
  };

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
            src={isAuthenticated ? user?.picture : '/default-image.png'}
            alt={isAuthenticated ? user?.name : 'empty-profile-image'}
            title={isAuthenticated ? user?.name : 'Profile'}
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
