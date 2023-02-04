const productsServices = require('../services/productsServices');

const validateProductNotFound = async (req, res, next) => {
  const { id } = req.params;

  const { type } = await productsServices.findById(id);

  if (type) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  validateProductNotFound,
};