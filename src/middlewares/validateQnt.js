const validateQnt = (req, res, next) => {
  const bodyQnt = req.body;
  const quantity = bodyQnt.every((item) => item.quantity || item.quantity === 0);
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const quantityValue = bodyQnt.every((value) => value.quantity > 0);
  if (!quantityValue) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validateQnt,
};