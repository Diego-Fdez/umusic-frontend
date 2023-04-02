import { verifyToken } from '@/middlewares/checkJwt';
import generateId from '@/utils/generateId';
import db from '@/database/db';
import Room from '@/models/roomModel';

/**It takes a temporary user id, checks if the user exists, and if it does, it generates a token for
 * the user */
const temporaryUserLogin = async (req, res) => {
  /* Checking if the request method is not POST, then it returns a 405 status code with a message. */
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }

  const { id, name, room } = req.body;

  /* Checking if the id, name, and room are undefined. If they are, it returns a 400 status code with a
  message. */
  if (id === undefined || name === undefined || room === undefined) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: 'One or more fields are missing' },
    });
  }

  try {
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

    await db.connect();

    /* Checking if the user exists in the database. */
    const fieldsExists = await Room.find({ _id: room, user_id: id });

    await db.disconnect();

    /* Checking if the user exists in the database. */
    if (!fieldsExists) {
      return res.status(401).send({
        status: 'FAILED',
        data: { error: 'One or more fields not found in database' },
      });
    }

    /* Creating a new object with the properties sub, id, and name. */
    const userInfo = {
      sub: id,
      id: generateId(),
      name: name,
      roomId: room,
    };

    res
      .status(200)
      .send({ status: 'OK', data: { userInfo: userInfo, userToken: token } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default temporaryUserLogin;
