const productsModel = require('../models/productsModel');

const validateProductIdArray = async (req, res, next) => {
  const products = req.body;
  const productId = products.filter((product) => product.productId);

  if (productId.length === 0) { 
    return res.status(400).json({ message: '"productId" is required' });
  }

  const productResolved = await Promise.all(products.map(async (product) => {
    const result = await productsModel.findById(product.productId);
    return result;
  }));

  const id = productResolved.every((item) => item !== undefined);
  if (!id) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateProductIdArray,
};