import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/Navbar.module.css';
import videoStore from '@/store/videoStore';
import { NavModal, QRScreenModal } from './components';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const addKeyword = videoStore((state) => state.addKeyword);
  //const nameUrl = window.location.href;

  /**The addKeyword function adds the keyword to the
   * keywords array in the state. The function then navigates to the home page*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      addKeyword(input);
      //if (nameUrl !== '/') router.push('/'); //ToDo
      setInput('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.logoContainer}>
        <Link href={'/'}>
          <h1 className={styles.logo}>UMUSIC</h1>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleSubmit;
        }}
        className={styles.searchContainer}
      >
        <input
          type='search'
          placeholder='Search your music'
          className={styles.searchInput}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' className={styles.searchButton}>
          <Image
            src='/search-icon.svg'
            alt='search-icon'
            className={styles.searchIcon}
            width={25.6}
            height={25.6}
            loading='lazy'
          />
        </button>
      </form>
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
        <NavModal
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
