import db from "@/database/db";
import { verifyToken } from "@/middlewares/checkJwt";
import Room from "@/models/roomModel";

//It finds all the rooms that have the userId
const getAllMyRooms = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .send({ status: "FAILED", data: { error: "Method not allowed" } });
  }

  const { userId } = req.body;

  try {
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

    await db.connect();

    /* Finding all the rooms that have the userId that was passed in the request body. */
    const rooms = await Room.find({ user_id: userId }).select(
      "-createdAt -updatedAt -__v"
    );

    // Checking if the rooms variable is empty.
    if (!rooms) {
      return res.status(404).send({ status: "FAILED", data: "No rooms found" });
    }

    res.status(200).send({ status: "OK", data: rooms });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  } finally {
    await db.disconnect();
  }
};

export default getAllMyRooms;
