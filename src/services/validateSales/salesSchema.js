const Joi = require('joi');

// const salesSchema = Joi.object({
//   // productId: Joi.number().min(1).required().label('productId'),
//   quantity: Joi.number().min(1).required().label('quantity'),
// }).messages({
//   // 'any.required': '{{#label}} is required',
//   'number.min': '{{#label}} must be greater than or equal to 1',
//   // 'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
// });

const salesIdSchema = Joi.number().min(1).required().integer();

module.exports = {
  salesIdSchema,
  // salesSchema,
};