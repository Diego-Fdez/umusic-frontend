import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import UseAuth0Provider from '@/hooks/useAuth0Provider';

export default function App({ Component, pageProps }) {
  return (
    <UseAuth0Provider>
      <Component {...pageProps} />
    </UseAuth0Provider>
  );
}
