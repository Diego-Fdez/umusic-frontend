import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Categories =
  mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);
export default Categories;
