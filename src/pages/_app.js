import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import UseAuth0Provider from '@/hooks/useAuth0Provider';
import useWebSocket from '@/hooks/useWebSocket';

export default function App({ Component, pageProps }) {
  const { socketInitializer } = useWebSocket();

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <UseAuth0Provider>
      <Component {...pageProps} />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </UseAuth0Provider>
  );
}
