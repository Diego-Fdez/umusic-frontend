import { Suspense, lazy } from 'react';
import styles from './styles/Profile.module.css';
import { Loader, Navbar, HeadScreen } from '@/components';
import { metaProfilePageContent } from '@/utils/metaContents';
const MyConfigurations = lazy(() =>
  import('./components/MyConfigurations/MyConfigurations')
);
const DonationPanel = lazy(() =>
  import('./components/DonationPanel/DonationPanel')
);
const ConditionsScreen = lazy(() =>
  import('./components/ConditionsScreen/ConditionsScreen')
);
const Footer = lazy(() => import('./components/Footer/Footer'));
const PoliciesScreen = lazy(() =>
  import('./components/PoliciesScreen/PoliciesScreen')
);
const CookiePolicy = lazy(() =>
  import('./components/CookiePolicy/CookiePolicy')
);

const Profile = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={'Configurations'} content={metaProfilePageContent} />
      <Navbar />
      <main className={styles.profileContainer}>
        <DonationPanel />
        <MyConfigurations />
        <ConditionsScreen />
        <PoliciesScreen />
        <CookiePolicy />
        <Footer />
      </main>
    </Suspense>
  );
};

export default Profile;
