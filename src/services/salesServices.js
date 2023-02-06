const salesModel = require('../models/salesModel');
const salesSchema = require('./validateSales/idValidate');

// const addNewSales = async (newSalesArray) => {
//   const salesArraySchema = Joi.array().items(salesSchema);
//   const { error } = salesArraySchema.validate(newSalesArray);
//   const errorQuantity = { status: 422, message: error.message };
//   // const errorMin = { status: 422, message: error.message };
//   // const errorNotFound = { status: 422, message: 'Product not found' };
//   if (error) throw errorQuantity;
//   // const newSale = await salesModel.addNewSales(newSales);
//   // return newSale;
// };

// const addNewSales = async (newSalesArray) => {
//   const insertId = await salesModel.addNewSales(newSalesArray);
//   return { ty}
// };

const getAll = async () => {
  // criar as validaçoes 
  const allSales = await salesModel.getAll();
  // console.log(allProducts);
  return { type: null, message: allSales };
};

const findById = async (id) => { 
  const error = salesSchema.validateSalesId(id); // validateSalesId
  if (error.type) throw error; // era um return

  const singleSale = await salesModel.findById(id);
  if (singleSale.length === 0) { // try undefined
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: singleSale };
};

const deleteSales = async (id) => {
  const deleting = await salesModel.deleteSales(id);
  return { type: null, deleting };
};

const getSales = async (id) => {
  let result = null;
  if (!id) {
    result = await salesModel.getAll();
  } else {
    result = await salesModel.findById(id);
  } return { type: null, result };
};

module.exports = {
  // addNewSales,
  getAll,
  findById,
  deleteSales,
  getSales,
};