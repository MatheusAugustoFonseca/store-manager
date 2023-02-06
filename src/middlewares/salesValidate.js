const salesService = require('../services/salesServices');

const salesValidateId = async (req, res, next) => {
  const { id } = req.params;
  const { result } = await salesService.getSales(id);
  if (result.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

module.exports = {
  salesValidateId,
};