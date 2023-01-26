const productsModels = require('../models/productsModel');

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

module.exports = {
  getAll,
  findById,
};