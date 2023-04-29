import { Ubuntu } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import UseAuth0Provider from '@/hooks/useAuth0Provider';

const Noop = ({ children }) => <>{children}</>;

const ubuntu = Ubuntu({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

function App({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <UseAuth0Provider>
      <style jsx global>{`
        html {
          font-family: ${ubuntu.style.fontFamily};
        }
      `}</style>
      <Auth>
        <Component {...pageProps} />
      </Auth>
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

export default App;
