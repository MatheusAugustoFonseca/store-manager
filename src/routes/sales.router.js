const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidate = require('../middlewares/salesValidate');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.findById);
router.delete('/:id',
  salesValidate.salesValidateId,
  salesController.deleteSales);

module.exports = router;
