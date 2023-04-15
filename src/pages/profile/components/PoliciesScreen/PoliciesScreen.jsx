import styles from "./styles/PoliciesScreen.module.css";

const PoliciesScreen = () => {
  return (
    <div className={styles.policiesWrapper}>
      <div className={styles.policiesTitle}>
        <h2>Privacy Policy</h2>
      </div>
      <div className={styles.policiesContent}>
        <div>
          <p>
            This privacy policy describes how information is collected, used and
            shares the user's personal information when using our website app.
          </p>
          <h3>Information we collect</h3>
          <p>
            When you use our web app, we may collect the following information:
          </p>
          <ul>
            <li>Account information for playlists you create in our app.</li>
            <li>
              Auth0 profile information, including username and the email
              address.
            </li>
          </ul>
          <h3>Use of information</h3>
          <p>We use the information collected for the following purposes:</p>
          <ul>
            <li>Provide and improve our services and functionalities.</li>
            <li>Personalize the user experience.</li>
            <li>Allow users to share playlists with friends.</li>
            <li>Send relevant notifications and communications.</li>
            <li>Identify and solve technical problems.</li>
          </ul>
          <h3>Share information</h3>
          <p>
            We do not share personal information with third parties unless it is
            required by law or user consent has been obtained.
          </p>
          <h3>Changes to the privacy policy</h3>
          <p>
            We may update this privacy policy from time to time. HE recommends
            that the user review this page from time to time to be aware of any
            changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliciesScreen;
