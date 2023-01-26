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

module.exports = {
  getAll,
  findById,
};
