import { pool } from '@/database/pool';
import middleware from '@/middlewares/middleware';
import whiteList from '@/utils/whiteList';

const insertCategories = async (req, res) => {
  const { categoryName } = req.body;

  try {
    //A query to get the data from the database. */
    const [rows] = await pool.query(`SELECT *
    FROM categories WHERE category_name = '${categoryName.toLowerCase()}'`);

    //Checking if the rows are empty and if they are it is returning a 404 error.
    if (rows.length <= 0) {
      /* Inserting a new category into the database. */
      await pool.query('INSERT INTO categories (category_name) VALUES (?)', [
        categoryName.toLowerCase(),
      ]);
    } else {
      return res.status(400).send({
        status: 'FAILED',
        data: 'Category already exists in the database.',
      });
    }

    res.send({ status: 'OK', data: 'category inserted' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, category_name FROM categories');

    //Checking if the rows are empty and if they are it is returning a 404 error.
    if (rows.length <= 0)
      return res.status(404).send({
        status: 'FAILED',
        data: 'Categories not found',
      });

    res.send({ status: 'OK', data: rows });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const handler = async (req, res) => {
  // Wait for the CORS middleware
  await middleware(req, res);

  // Set up the white list
  await whiteList(req, (err) => {
    if (err) {
      return res.status(500).send('CORS middleware bug');
    }
  });

  if (req.method === 'GET') {
    return getAllCategories(req, res);
  } else if (req.method === 'POST') {
    return insertCategories(req, res);
  } else {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }
};

export default handler;
