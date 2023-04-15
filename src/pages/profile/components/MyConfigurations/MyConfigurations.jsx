import styles from "./styles/MyConfigurations.module.css";

const MyConfigurations = () => {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileTitle}>
        <h2>Configurations</h2>
      </div>
      <div className={styles.profileContent}>
        <div className={styles.language}>
          <div>
            <p>Language:</p>
            <select name='language'>
              <option value=''>--Select a Language--</option>
              <option value='es'>Spanish</option>
              <option value='en'>English</option>
            </select>
          </div>
          <div>
            <p>Default Playlist:</p>
            <select name='language'>
              <option value=''>--Select a Language--</option>
              <option value='es'>Spanish</option>
              <option value='en'>English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyConfigurations;
