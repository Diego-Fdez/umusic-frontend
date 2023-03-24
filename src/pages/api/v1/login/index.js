import jwt from 'jsonwebtoken';
import { pool } from '@/database/pool.js';
import generateId from '@/utils/generateId';

//register a new admin
const registerUser = async (id, email, userName, picture) => {
  const userType = 'P';
  const roomId = `${generateId()}${id}`;
  try {
    /* Inserting a new user into the database. */
    await pool.query(
      'INSERT INTO users (id, email, user_name, picture, room_id, user_type) VALUES (?,?,?,?,?,?)',
      [id, email, userName, picture, roomId, userType]
    );

    //check the user
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/** It checks if the user exists in the database, if not, it registers the user and returns the user's
 * data, if the user exists, it returns the user's data */
const loginUser = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }

  const { id, email, userName, picture } = req.body;
  let data = {};

  try {
    //check the user
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    /* Checking if the user exists in the database, if not, it registers the user and returns the
    user's
     * data, if the user exists, it returns the user's data. */
    if (rows.length <= 0) {
      const result = await registerUser(id, email, userName, picture);
      data = result;
    } else {
      data = rows[0];
    }

    //generate a token for the user
    const token = jwt.sign(
      { id: data.id, userType: data.user_type },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    const { createdAt, ...rest } = data;

    res.send({
      status: 'OK',
      data: { music_token: token, userInfo: rest },
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default loginUser;
