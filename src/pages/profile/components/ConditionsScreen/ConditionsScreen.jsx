import styles from "./styles/TermsScreen.module.css";

const ConditionsScreen = () => {
  return (
    <div className={styles.termsWrapper}>
      <div className={styles.termsTitle}>
        <h2>Conditions</h2>
      </div>
      <div className={styles.termsContent}>
        <div>
          <h2>Terms of Service for Umusic</h2>

          {/* Introduction  */}
          <h3>1. Introduction</h3>
          <p>
            These Terms of Service govern the use of Umusic, which allows users
            create and share playlists via the API from YouTube. By using the
            application, you accept these Conditions in your whole. If you do
            not agree with any of these Conditions, do not you must use the app.
          </p>

          {/* Application usage  */}
          <h3>2. Application usage</h3>
          <p>
            a. The app allows you to create and share playlists using the
            YouTube API. When using the application, you must comply with all
            YouTube policies and terms of service.
          </p>
          <p>
            b. The application is provided "as is" and its availability or
            functionality at all times. we will not be responsible for any
            damages arising from the use of the application.
          </p>
          <p>
            c. When using the application, you must comply with all laws and
            applicable regulations.
          </p>
          <p>
            d. The application reserves the right to remove any list of
            reproduction or content that infringes copyright or any other
            applicable law or regulation.
          </p>

          {/* Intellectual property */}
          <h3>3. Intellectual property</h3>
          <p>
            a. All intellectual property rights related to the application and
            its content are property of Umusic.
          </p>
          <p>
            b. Reproduction, distribution or modification of the content of the
            application without the prior written consent of Umusic.
          </p>

          {/* Privacy  */}
          <h3>4. Privacy</h3>
          <p>
            a. The application collects personal information, including your
            name and email address, to allow you to create an account and use
            the app.
          </p>
          <p>
            b. The personal information you provide will be used in accordance
            with our Privacy Policy, which is available at [enlace a la política
            de privacidad].
          </p>

          {/* Modifications of the Conditions  */}
          <h3>5. Modifications of the Conditions</h3>
          <p>
            We reserve the right to change these Terms at any moment. Any
            modification will be effective immediately after its publication in
            the application. If you do not agree with the modifications, you
            must stop using the application.
          </p>

          {/* Termination  */}
          <h3>6. Termination</h3>
          <p>
            We reserve the right to terminate your access to the application at
            any time and for any reason. In case of termination, all the
            provisions of these Terms will continue to apply.
          </p>

          {/* applicable law */}
          <h3>7. Applicable law</h3>
          <p>
            These Conditions are governed by the laws of Costa Rica, without
            regard to Consider your conflicts of laws. Any dispute related to
            these Conditions will be resolved in the courts of Puntarenas.
          </p>

          {/* Contact  */}
          <p>
            If you have any questions or comments about these Conditions, do not
            hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConditionsScreen;
