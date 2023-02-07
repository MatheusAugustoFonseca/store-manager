const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidate = require('../middlewares/salesValidate');
// const validateProductNotFound = require('../middlewares/validateNotFound');
const salesProductsId = require('../middlewares/salesProductId');
const validateQnt = require('../middlewares/validateQnt');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.findById);
router.delete('/:id',
salesValidate.salesValidateId,
salesController.deleteSales);
router.put('/:id',
  salesValidate.salesValidateId,
  salesProductsId.validateProductIdArray,
  validateQnt.validateQnt,
  salesController.update);

module.exports = router;
