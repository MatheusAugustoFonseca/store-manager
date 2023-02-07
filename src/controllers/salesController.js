const salesService = require('../services/salesServices');
const errorMap = require('../utils/errorMap');

// const addNewSales = async (req, res, next) => {
//   try {
//     const sales = req.body;
//     const newSales = await salesService.addNewSales(sales);
//     return res.status(201).json(newSales);
//   } catch (error) {
//     next(error);
//   }   
// };

const getAll = async (_req, res) => {
  const { message } = await salesService.getAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
   res.status(200).json(message);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { type } = await salesService.deleteSales(id);
  if (!type) res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const newSale = req.body;
  const type = await salesService.update(id, newSale);
  if (!type) res.status(200).json({ saleId: id, itemsUpdated: newSale });
 };

module.exports = {
  // addNewSales,
  getAll,
  findById,
  deleteSales,
  update,
};
