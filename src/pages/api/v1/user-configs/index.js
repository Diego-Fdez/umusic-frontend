import db from "@/database/db";
import UserConfigs from "@/models/userConfigsModel";
import { verifyToken } from "@/middlewares/checkJwt";

async function searchUserConfigs(userId) {
  /* Inserting userConfigs. */
  const userExist = await UserConfigs.aggregate([
    {
      $match: {
        user_id: userId,
      },
    },
    {
      $lookup: {
        from: "rooms",
        localField: "room_id",
        foreignField: "_id",
        as: "name",
      },
    },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        _id: 0,
        "name._id": 0,
        "name.createdAt": 0,
        "name.updatedAt": 0,
        "name.__v": 0,
        "name.video_id": 0,
        "name.user_id": 0,
      },
    },
  ]);
  return userExist;
}

//function create a new userConfigs
const saveUserConfigs = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .send({ status: "FAILED", data: { error: "Method not allowed" } });
  }

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

  const { roomId, userId } = req.body;

  const language = req?.body?.language || "en";

  try {
    await db.connect();

    const userExist = await searchUserConfigs(userId);

    if (userExist?.length > 0 || !userExist) {
      //if exists, update the userConfigs
      await UserConfigs.findOneAndUpdate({
        room_id: roomId,
        language: language,
      });

      res.status(200).send({ status: "OK", data: userExist[0] });
    } else {
      //if doesn't exists, create a new userConfigs
      const newUserConfigs = new UserConfigs({
        user_id: userId,
        room_id: roomId,
        language: language,
      });

      await newUserConfigs.save();

      const userExist = await searchUserConfigs(userId);

      res.status(201).send({ status: "OK", data: userExist[0] });
    }
    await db.disconnect();
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default saveUserConfigs;
