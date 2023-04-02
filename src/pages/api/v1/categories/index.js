import db from '@/database/db';
import Categories from '@/models/categoriesModel';

const insertCategories = async (req, res) => {
  const { categoryName } = req.body;
  try {
    //A query to get the data from the database. */
    await db.connect();

    /* Checking if the category already exist in the database. */
    const categoryExist = await Categories.findOne({ categoryName });

    /* Checking if the category already exist in the database. */
    if (categoryExist) {
      return res
        .status(400)
        .send({ status: 'FAILED', data: { error: 'Category already exist' } });
    }

    /* Creating a new category object. */
    const newCategory = new Order({
      category_name: categoryName,
    });

    await newCategory.save();
    await db.disconnect();

    res.status(201).send({ status: 'OK', data: 'category inserted' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};
const getAllCategories = async (req, res) => {
  try {
    await db.connect();

    /* Selecting all the fields except the ones specified. */
    const categories = await Categories.find().select(
      '-createdAt -updatedAt -__v'
    );

    /* Checking if the categories is empty or not. If it is empty, it will return a 404 status code
    with a message. */
    if (!categories) {
      return res.status(404).send({
        status: 'FAILED',
        data: { error: 'No categories found in the database' },
      });
    }

    await db.disconnect();

    res.status(200).send({ status: 'OK', data: categories });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const handler = async (req, res) => {
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
