import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SimplePeer from "simple-peer";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import UseAuth0Provider from "@/hooks/useAuth0Provider";

export default function App({ Component, pageProps }) {
  const [stream, setStream] = useState(null);
  const [peer1, setPeer1] = useState(null);
  const [peer2, setPeer2] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setStream(stream);
        setupPeer(stream);
      } catch (error) {
        console.error(error);
      }
    };
    getMedia();
  }, []);

  const setupPeer = (stream) => {
    const newPeer1 = new SimplePeer({ initiator: true });
    const newPeer2 = new SimplePeer();

    setPeer1(newPeer1);
    setPeer2(newPeer2);

    newPeer1.on("signal", (data) => {
      newPeer2.signal(data);
    });

    newPeer2.on("signal", (data) => {
      newPeer1.signal(data);
    });

    newPeer2.on("stream", (stream) => {
      const video = document.querySelector("video");
      video.srcObject = stream;
    });
  };

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
