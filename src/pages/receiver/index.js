import { useEffect, useState } from "react";
import SimplePeer from "simple-peer";

function ScreenReceiver({ peerData }) {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const setupPeer = async () => {
      try {
        const newPeer = new SimplePeer();
        setPeer(newPeer);

        newPeer.on("signal", (data) => {
          peerData(data);
        });

        newPeer.signal(peerData);

        newPeer.on("stream", (stream) => {
          setStream(stream);
        });
      } catch (error) {
        console.error(error);
      }
    };
    setupPeer();
  }, []);

  return (
    <div>
      <video autoPlay></video>
    </div>
  );
}

export default ScreenReceiver;
