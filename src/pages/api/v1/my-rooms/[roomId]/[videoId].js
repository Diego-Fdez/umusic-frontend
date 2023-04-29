import db from '@/database/db';
import Room from '@/models/roomModel';
import { verifyToken } from '@/middlewares/checkJwt';

/* Checking if the token is valid. */
async function checkTheToken(req, res) {
  /* Checking if the token is valid. */
  const token = req.headers.authorization?.split(' ')[1];
  const isValidToken = await verifyToken(token);

  /* Checking if the token is valid. */
  if (!isValidToken) {
    return res.status(401).send({
      status: 'FAILED',
      data: { error: 'Token is invalid' },
    });
  }
}

//It deletes a video from the room list
const deleteVideoFromRoomList = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }
  const { videoId, roomId } = req.query;

  try {
    await checkTheToken(req, res);

    await db.connect();

    /* Getting the room by the id. */
    const videoExist = await Room.find({
      _id: roomId,
      video_id: videoId,
    });

    /* It checks if the video exists. If it doesn't, it sends a message to the frontend. */
    if (!videoExist) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: 'Video not found' },
      });
      return;
    }

    //if it passes the validations, the video is removed
    videoExist[0].video_id.pull(videoId);
    await videoExist[0].save();

    //sending the response to the frontend
    res.status(200).send({
      status: 'OK',
      data: 'Video removed from the playlist.',
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  } finally {
    await db.disconnect();
  }
};

export default deleteVideoFromRoomList;
