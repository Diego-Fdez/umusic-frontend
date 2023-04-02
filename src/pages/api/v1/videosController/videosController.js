import db from '@/database/db';
import Channels from '@/models/channelsModel';
import Videos from '@/models/videoModel';

/** It checks if the channel exists in the database, if it does not exist, it inserts the channel into
 * the database */
export const registerChannel = async (
  channelId,
  channelTitle,
  channelPictureURL,
  videoId
) => {
  try {
    //check the channel in the DB
    const channelExist = await Channels.findOne({ channel_id: channelId });

    /* Checking if the channel exists in the database, if it does not exist, it inserts the channel
    into the database. */
    if (!channelExist) {
      const newChannel = new Channels({
        channel_id: channelId,
        channel_title: channelTitle,
        channel_pic_url: channelPictureURL,
        video_id: videoId,
      });

      await newChannel.save();
    }

    const videoExist = await Channels.findOne({ video_id: videoId });

    /* Checking if the video exists in the database, if it does not exist, it inserts the video into
    the database. */
    if (!videoExist) {
      channelExist.video_id.push(videoId);
      await channelExist.save();
    }
  } catch (error) {
    throw error;
  }
};

/** It checks if the video exists in the database, if it does not exist, it inserts the video into
 * the database */
export const registerVideo = async (
  videoId,
  videoTitle,
  videoPictureURL,
  videoLength
) => {
  try {
    //check the video in the DB
    const videoExist = await Videos.findOne({ video_id: videoId });

    /* Checking if the video exists in the database, if it does not exist, it inserts the video into
     * the database. */
    if (!videoExist) {
      const newVideo = new Videos({
        video_id: videoId,
        video_title: videoTitle,
        video_pic_url: videoPictureURL,
        video_length: videoLength,
      });

      await newVideo.save();
    }
  } catch (error) {
    throw error;
  }
};
