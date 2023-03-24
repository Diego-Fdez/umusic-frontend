import { pool } from '@/database/pool';
import {
  registerChannel,
  registerVideo,
} from '../videosController/videosController';

/**inserts the channel info into the database, inserts the video
 * info into the database, and then inserts the room info into the database.*/
const addVideosToRoomList = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not supported' } });
  }

  const {
    roomId,
    userId,
    videoId,
    channelId,
    videoTitle,
    channelTitle,
    videoPictureURL,
    channelPictureURL,
    videoLength,
  } = req.body;

  try {
    //insert the channel info in DB
    await registerChannel(channelId, channelTitle, channelPictureURL);

    //insert the video info in DB
    await registerVideo(
      videoId,
      channelId,
      videoTitle,
      videoPictureURL,
      videoLength
    );

    /* Inserting a new room into the database. */
    await pool.query(
      'INSERT INTO rooms (room_id, user_id, video_id) VALUES (?,?,?)',
      [roomId, userId, videoId]
    );

    res.send({ status: 'OK', data: 'Your video has been added to the list!' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default addVideosToRoomList;
