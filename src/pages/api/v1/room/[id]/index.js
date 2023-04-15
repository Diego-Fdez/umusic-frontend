import mongoose from "mongoose";
import db from "@/database/db";
import Room from "@/models/roomModel";
import { verifyToken } from "@/middlewares/checkJwt";

//function to check if the token is valid
async function checkTheToken(req, res) {
  /* Checking if the token is valid. */
  const token = req.headers.authorization?.split(" ")[1];
  const isValidToken = await verifyToken(token);

  /* Checking if the token is valid. */
  if (!isValidToken) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "Token is invalid" },
    });
  }
}

/** It gets the data from the database and sends it to the frontend
 * @returns The data from the database. */
const getRoomById = async (req, res) => {
  const { id } = req.query;

  try {
    await checkTheToken(req, res);

    /* A query to get the data from the database. */
    await db.connect();

    const roomExist = await Room.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$video_id",
      },
      {
        $lookup: {
          from: "videos",
          localField: "video_id",
          foreignField: "video_id",
          as: "videos",
        },
      },
      {
        $unwind: "$videos",
      },
      {
        $lookup: {
          from: "channels",
          localField: "videos.video_id",
          foreignField: "video_id",
          as: "videos.channels",
        },
      },
      {
        $unwind: "$videos.channels",
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          video_id: 0,
          __v: 0,
          "videos._id": 0,
          "videos.createdAt": 0,
          "videos.updatedAt": 0,
          "videos.__v": 0,
          "videos.channels.createdAt": 0,
          "videos.channels.updatedAt": 0,
          "videos.channels.video_id": 0,
          "videos.channels._id": 0,
          "videos.channels.__v": 0,
        },
      },
    ]);

    /* It checks if the room exists. If it doesn't, it sends a message to the frontend. */
    if (!roomExist) {
      return res.status(404).send({
        status: "FAILED",
        data: "Create a list and share music with your friends.",
      });
    }

    await db.disconnect();

    /* Sending the data to the frontend. */
    res.status(200).send({ status: "OK", data: roomExist });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// This function deletes all videos from a playlist in a MongoDB database.
const deleteAllVideosFromRoom = async (req, res) => {
  const { id } = req.query;

  try {
    await checkTheToken(req, res);

    await db.connect();

    //This code is deleting all videos from a playlist in a MongoDB database.
    const result = await Room.updateOne(
      { _id: id },
      { $unset: { video_id: "" } }
    );

    /*it sends a 404 status code with a message indicating that
    there are no videos in the playlist. */
    if (!result) {
      return res.status(404).send({
        status: "FAILED",
        data: "There are no videos in this playlist.",
      });
    }

    await db.disconnect();
    res.status(200).send({ status: "OK", data: "Deleted all videos" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.query;

  try {
    await checkTheToken(req, res);

    await db.connect();

    const playlistExist = await Room.deleteOne({ _id: id });

    if (!playlistExist) {
      return res.status(404).send({
        status: "FAILED",
        data: "Playlist not found",
      });
    }

    await db.disconnect();
    res.status(200).send({ status: "OK", data: "Playlist deleted" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const handler = (req, res) => {
  if (req.method === "GET") {
    return getRoomById(req, res);
  } else if (req.method === "PUT") {
    return deleteAllVideosFromRoom(req, res);
  } else if (req.method === "DELETE") {
    return deleteRoom(req, res);
  } else {
    return res
      .status(405)
      .send({ status: "FAILED", data: { error: "Method not allowed" } });
  }
};

export default handler;
