// const Joi = require('joi');
// const salesModel = require('../models/salesModel');

// const salesSchema = Joi.object({
//   productId: Joi.number().min(1).required().label('productId'),
//   quantity: Joi.number().min(1).required().label('quantity'),
// }).messages({
//   'any.required': '{{#label}} is required',
//   'number.min': '{{#label}} must be greater than or equal to 1',
// });

// const addNewSales = async (salesArray) => {
//   const salesSchema = Joi.a;
//   const newSale = salesModel.addNewSales;
//   return newSale;
// };

// module.exports = {
//   addNewSales,
// };