import db from '@/database/db';
import Room from '@/models/roomModel';
import {
  registerChannel,
  registerVideo,
} from '../videosController/videosController';
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

/**inserts the channel info into the database, inserts the video
 * info into the database, and then inserts the room info into the database.*/
const addVideosToRoomList = async (req, res) => {
  const {
    roomId,
    videoId,
    channelId,
    videoTitle,
    channelTitle,
    videoPictureURL,
    channelPictureURL,
    videoLength,
  } = req.body;

  const id = roomId;
  try {
    await checkTheToken(req, res);

    await db.connect();

    /* Inserting a new video to room. */
    const roomExists = await Room.findById(id).exec();

    /* Checking if the room exists. */
    if (!roomExists) {
      return res
        .status(404)
        .send({ status: 'FAILED', data: { error: 'Room does not exist' } });
    }

    /* Adding the videoId to the video_id array in the room document. */
    roomExists.video_id.push(videoId);
    await roomExists.save();

    //insert the channel info in DB
    await registerChannel(channelId, channelTitle, channelPictureURL, videoId);

    //insert the video info in DB
    await registerVideo(videoId, videoTitle, videoPictureURL, videoLength);

    res
      .status(201)
      .send({ status: 'OK', data: 'Your video has been added to the list!' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  } finally {
    await db.disconnect();
  }
};

//It creates a new room in the database
const createRoom = async (req, res) => {
  const { userId, roomName } = req.body;

  try {
    await checkTheToken(req, res);

    await db.connect();

    /* Checking if the room name already exists in the database. */
    const roomNameExist = await Room.findOne({ room_name: roomName });

    /* Checking if the room name already exists in the database. */
    if (roomNameExist) {
      return res.status(404).send({
        status: 'FAILED',
        data: { error: 'A room with that name already exists' },
      });
    }

    /* Creating a new room object. */
    const newRoom = new Room({
      user_id: userId,
      room_name: roomName,
    });

    /* Saving the room object to the database. */
    await newRoom.save();

    res.status(201).send({ status: 'OK', data: newRoom });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  } finally {
    await db.disconnect();
  }
};

const handler = (req, res) => {
  if (req.method === 'PUT') {
    return addVideosToRoomList(req, res);
  } else if (req.method === 'POST') {
    return createRoom(req, res);
  } else {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }
};
export default handler;
