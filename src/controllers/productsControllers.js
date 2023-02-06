const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const allProducts = await productsServices.getAll();
  res.status(200).json(allProducts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message, data } = await productsServices.findById(id);

  if (type) res.status(type).json({ message });
  // if (type === 404) res.status(type).json(message);
  res.status(200).json(data);
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsServices.addNewProduct({ name });
  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type } = await productsServices.updateProduct(id, name);

  if (!type) return res.status(200).json({ id, name }); 
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type } = await productsServices.deleteProduct(id);
  if (!type) res.status(204).end();
};

const search = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsServices.search(q);
  res.status(200).json(message);
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  search,
};
