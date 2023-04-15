import styles from "./styles/CookiePolicy.module.css";

const CookiePolicy = () => {
  return (
    <div className={styles.cookiePolicyWrapper}>
      <div className={styles.cookiePolicyTitle}>
        <h2>Cookies Policy</h2>
      </div>
      <div className={styles.cookiePolicyContent}>
        <div>
          <p>
            This cookie policy describes how cookies are used in our web app.
          </p>
          <h3>What are cookies?</h3>
          <p>
            Cookies are small text files that are stored on the user's device
            when visiting a website. These cookies contain information about
            user activity on the site Web.
          </p>
          <h3>What cookies do we use?</h3>
          <p>In our web app we use the following cookies:</p>
          <ul>
            <li>
              Session cookies: used to maintain the user's session active. These
              cookies are deleted when the user closes the browser.
            </li>
            <li>
              Local storage cookies: used to store user information and names of
              playlists in the Session Storage. These cookies are deleted when
              the user Close the browser tab or window.
            </li>
          </ul>
          <h3>How are cookies used?</h3>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>Provide and improve our services and functionalities.</li>
            <li>Personalize the user experience.</li>
            <li>Identify and solve technical problems.</li>
          </ul>
          <h3>How can I control cookies?</h3>
          <p>
            The user can control cookies through the settings from the browser.
            It is important to note that disabling the Cookies may affect the
            functionality of the web app.
          </p>
          <h3>Changes to the cookie policy</h3>
          <p>
            We may update this cookie policy periodically. HE recommends that
            the user review this page from time to time to be aware of any
            changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
