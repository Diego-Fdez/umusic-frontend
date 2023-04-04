import { Server } from 'socket.io';

//If the server has an io object, then the socket is already running. If not, then create a new socket
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
      });

      socket.on('addVideo', (video) => {
        socket.broadcast.to(video._id).emit('newVideo', video);
      });
    });
  }
  res.end();
};

export default SocketHandler;
