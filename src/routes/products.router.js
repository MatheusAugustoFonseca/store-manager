const express = require('express');

const productsControllers = require('../controllers/productsControllers');
const validate = require('../middlewares/validate');
const validateProductNotFound = require('../middlewares/validateNotFound');

const router = express.Router();

router.get('/', productsControllers.getAll);
router.get('/:id', productsControllers.findById);
router.post('/', validate.validateProduct, productsControllers.addNewProduct);
router.put('/:id', validate.validateProduct,
  validateProductNotFound.validateProductNotFound,
  productsControllers.updateProduct);
router.delete('/:id', validateProductNotFound.validateProductNotFound,
  productsControllers.deleteProduct);

module.exports = router;
