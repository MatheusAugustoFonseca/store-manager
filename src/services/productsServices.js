// const Joi = require('joi');

const productsModels = require('../models/productsModel');

// const productSchema = Joi.object({
//   name: Joi.string().min(5).max(30).required(),
// });

const getAll = async () => {
  const allProducts = await productsModels.getAll();
  // console.log(allProducts);
  return allProducts;
};
// getAll();

const findById = async (id) => {
  const productById = await productsModels.findById(id);
  if (!productById) return { type: 404, message: 'Product not found' };
  return { type: null, data: productById };
};

const addNewProduct = async ({ name }) => {
  const id = await productsModels.addNewProduct({ name });
  return { id, name };
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
};
