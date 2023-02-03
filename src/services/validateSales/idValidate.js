const salesSchema = require('./salesSchema');

const validateSalesId = (id) => {
  const { error } = salesSchema.salesIdSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', messsage: 'id must be a number' };
  return { type: null, messsage: '' };
};

module.exports = {
  validateSalesId,
}; 
