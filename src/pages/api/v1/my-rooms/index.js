import db from '@/database/db';
import Room from '@/models/roomModel';

//It finds all the rooms that have the userId
const getAllMyRooms = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }

  const { userId } = req.body;
  console.log(userId);
  try {
    await db.connect();

    /* Finding all the rooms that have the userId that was passed in the request body. */
    const rooms = await Room.find({ user_id: userId }).select(
      '-createdAt -updatedAt -__v'
    );

    // Checking if the rooms variable is empty.
    if (!rooms) {
      return res.status(404).send({ status: 'FAILED', data: 'No rooms found' });
    }

    await db.disconnect();

    res.status(200).send({ status: 'OK', data: rooms });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default getAllMyRooms;
