import mongoose from 'mongoose';
import db from '@/database/db';
import Room from '@/models/roomModel';

/** It gets the data from the database and sends it to the frontend
 * @returns The data from the database. */
const getRoomById = async (req, res) => {
  const { id } = req.query;

  try {
    /* A query to get the data from the database. */
    await db.connect();

    const roomExist = await Room.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: '$video_id',
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'video_id',
          foreignField: 'video_id',
          as: 'videos',
        },
      },
      {
        $unwind: '$videos',
      },
      {
        $lookup: {
          from: 'channels',
          localField: 'videos.video_id',
          foreignField: 'video_id',
          as: 'videos.channels',
        },
      },
      {
        $unwind: '$videos.channels',
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          video_id: 0,
          __v: 0,
          'videos._id': 0,
          'videos.createdAt': 0,
          'videos.updatedAt': 0,
          'videos.__v': 0,
          'videos.channels.createdAt': 0,
          'videos.channels.updatedAt': 0,
          'videos.channels.video_id': 0,
          'videos.channels._id': 0,
          'videos.channels.__v': 0,
        },
      },
    ]);

    /* It checks if the room exists. If it doesn't, it sends a message to the frontend. */
    if (!roomExist) {
      return res.status(404).send({
        status: 'FAILED',
        data: 'Create a list and share music with your friends.',
      });
    }

    await db.disconnect();

    /* Sending the data to the frontend. */
    res.status(200).send({ status: 'OK', data: roomExist });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

//It deletes a video from the room list
const deleteVideoFromRoomList = async (req, res) => {
  const { id } = req.query;

  try {
    await db.connect();

    /* Getting the room by the id. */
    const videoExist = await Room.findById(id);

    /* It checks if the video exists. If it doesn't, it sends a message to the frontend. */
    if (!video) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: 'Video not found' },
      });
      return;
    }

    //if it passes the validations, the video is removed
    videoExist.videos_id.pull(req.body.id);
    await videoExist.save();

    await db.disconnect();

    //sending the response to the frontend
    res.status(200).send({
      status: 'OK',
      data: 'Video removed from the list.',
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const handler = (req, res) => {
  if (req.method === 'DELETE') {
    return deleteVideoFromRoomList(req, res);
  } else if (req.method === 'GET') {
    return getRoomById(req, res);
  } else {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }
};

export default handler;
