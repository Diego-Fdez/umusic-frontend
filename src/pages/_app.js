import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import UseAuth0Provider from "@/hooks/useAuth0Provider";

export default function App({ Component, pageProps }) {
  return (
    <UseAuth0Provider>
      <Component {...pageProps} autoPlay />
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
