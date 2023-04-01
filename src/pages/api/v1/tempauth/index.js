import { verifyToken } from '@/middlewares/checkJwt';
import generateId from '@/utils/generateId';

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

    /* Creating a new object with the properties sub, id, and name. */
    const userInfo = {
      sub: id,
      id: generateId(),
      name: name,
      roomId: room,
    };

    res
      .status(200)
      .send({ status: 'OK', data: { userInfo, userToken: token } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default temporaryUserLogin;
