// import jwt from 'jsonwebtoken';
// import db from '@/database/db';
// import User from '@/models/userModel';
// import generateId from '@/utils/generateId';

// //register a new user
// const registerUser = async (id, email, userName, picture) => {
//   const userType = 'P';
//   const roomId = `${generateId()}${id}`;

//   try {
//     /* Creating a new category object. */
//     const newCategory = new Order({
//       category_name: categoryName,
//     });

//     //check the user
//     const [rows] = await pool.query(
//       `SELECT * FROM users WHERE email = '${email}'`
//     );

//     return rows[0];
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// /** It checks if the user exists in the database, if not, it registers the user and returns the user's
//  * data, if the user exists, it returns the user's data */
// const loginUser = async (req, res) => {
//   if (req.method !== 'POST') {
//     return res
//       .status(405)
//       .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
//   }

//   const { id, email, userName, picture } = req.body;
//   let data = {};

//   try {
//     await db.connect();

//     /* Selecting all the fields except the ones specified. */
//     const userExist = await User.findOne({ email })
//       .select('-createdAt -updatedAt -__v')
//       .populate('room', 'room_id');

//     /* It checks if the user exists in the database, if not, it registers the user and returns the
//     user's
//      * data, if the user exists, it returns the user's data. */
//     if (!userExist) {
//       const result = await registerUser(id, email, userName, picture);
//       data = result;
//     } else data = userExist;

//     await db.disconnect();

//     //generate a token for the user
//     const token = jwt.sign(
//       { id: data.id, userType: data.user_type },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: '30d',
//       }
//     );

//     res.send({
//       status: 'OK',
//       data: { music_token: token, userInfo: data },
//     });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: 'FAILED', data: { error: error?.message || error } });
//   }
// };

// export default loginUser;
