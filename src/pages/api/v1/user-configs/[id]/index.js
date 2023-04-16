import db from "@/database/db";
import UserConfigs from "@/models/userConfigsModel";
import { verifyToken } from "@/middlewares/checkJwt";

//function create a new userConfigs
const getUserConfigs = async (req, res) => {
  if (req.method !== "GET") {
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

  const { id } = req.query;

  try {
    await db.connect();

    /* get the userConfigs. */
    const userExist = await UserConfigs.aggregate([
      {
        $match: {
          user_id: id,
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

    if (userExist.length === 0) {
      return res
        .status(404)
        .send({ status: "FAILED", data: { error: "No configs found" } });
    }

    await db.disconnect();

    res.status(200).send({ status: "OK", data: userExist[0] });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default getUserConfigs;
