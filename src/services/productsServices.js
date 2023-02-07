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

const updateProduct = async (id, name) => {
  const updated = await productsModels.updateProduct(id, name);
  return { type: null, updated };
};

const deleteProduct = async (id) => {
  const deleting = await productsModels.deleteProduct(id);
  // console.log(deleting);
  return { type: null, deleting };
};
  // console.log(deleteProduct(3));

const search = async (query) => {
  const findProduct = await productsModels.getAll();
  if (!query) return { type: null, message: findProduct };
  const productFound = findProduct.filter((product) => product.name.includes(query));
  return { type: null, message: productFound };
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  search,
};
