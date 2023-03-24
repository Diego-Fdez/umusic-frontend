import { pool } from '@/database/pool';

/**It takes a temporary user id, checks if the user exists, and if it does, it generates a token for
 * the user */
const temporaryUserLogin = async (temporaryUserId) => {
  try {
    //check the user
    const [rows] = await pool.query(
      `SELECT id, user_id, user_type, room_id FROM temporary_users WHERE id = '${temporaryUserId}'`
    );

    //generate a token for the temporary user
    const token = jwt.sign(
      { id: rows[0].id, userType: rows[0].user_type },
      process.env.JWT_SECRET,
      {
        expiresIn: '5h',
      }
    );

    return { music_token: token, userInfo: rows[0] };
  } catch (error) {
    throw error;
  }
};

//register a new temporary use
const temporaryUserRegistration = async (req, res) => {
  const { id } = req.query;

  /* Generating a random id for the temporary user. */
  const temporaryUserId = generateId();

  try {
    /* searching for the user in the database. */
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);

    if (rows.length <= 0)
      return res.status(404).send({ status: 'FAILED', data: 'User not found' });

    //register the temporary user
    await pool.query(
      'INSERT INTO temporary_users (id, user_id, room_id) VALUES (?,?,?)',
      [temporaryUserId, rows[0].id, rows[0].room_id]
    );

    const result = await temporaryUserLogin(temporaryUserId);

    res.send({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default temporaryUserRegistration;
