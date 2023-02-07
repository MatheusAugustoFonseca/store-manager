const salesModel = require('../models/salesModel');
const salesSchema = require('./validateSales/idValidate');

const addNewSales = async (newSalesArray) => {
  const saleId = await salesModel.addNewSales(newSalesArray);
  return { type: null, message: { id: saleId, itemsSold: newSalesArray } };
};

const getAll = async () => {
  // criar as validaçoes 
  const allSales = await salesModel.getAll();
  // console.log(allProducts);
  return { type: null, message: allSales };
};

const findById = async (id) => { 
  const error = salesSchema.validateSalesId(id);
  if (error.type) throw error;

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

const update = async (id, sales) => {
  const { type } = await salesModel.update(id, sales);
  return type;
};

module.exports = {
  addNewSales,
  getAll,
  findById,
  deleteSales,
  getSales,
  update,
};