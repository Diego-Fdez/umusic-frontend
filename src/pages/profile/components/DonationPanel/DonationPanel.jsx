import Link from "next/link";
import styles from "./styles/DonationPanel.module.css";

const DonationPanel = () => {
  return (
    <div className={styles.donationContainer}>
      <p>Thank you for your support and for using my video page!</p>
      <Link href='https://www.buymeacoffee.com/diegoFedez' target='_blank'>
        <img
          src='https://cdn.buymeacoffee.com/buttons/v2/default-red.png'
          alt='Buy Me A Coffee'
          className={styles.donationButton}
        />
      </Link>
    </div>
  );
};

export default DonationPanel;
