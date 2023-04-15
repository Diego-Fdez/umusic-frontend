import { Suspense } from "react";
import styles from "./styles/Profile.module.css";
import { Loader, Navbar, HeadScreen, GoogleAnalytics } from "@/components";
import MyConfigurations from "./components/MyConfigurations/MyConfigurations";
import DonationPanel from "./components/DonationPanel/DonationPanel";
import Footer from "./components/Footer/Footer";
import ConditionsScreen from "./components/ConditionsScreen/ConditionsScreen";
import PoliciesScreen from "./components/PoliciesScreen/PoliciesScreen";
import CookiePolicy from "./components/CookiePolicy/CookiePolicy";

const Profile = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={"Configurations"} />
      <GoogleAnalytics />
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
