const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/productsModel');
const { connection } = require('../../../src/models/connection');
const productsMock = require('./mocks/products.model.mock');
const { expect } = chai;

describe('Products Model', function () {
  describe('List all products', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Should return all products', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(productsMock);
    });
  });
  describe('Get product by id', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return the correct product by an unique id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[1]]]);

      const result = await productsModel.findById(2);

      expect(result).to.be.deep.equal(productsMock[1]);

    })
  });
  describe('Add new product', function () {
     afterEach(function () {
      sinon.restore();
    });
    it('Should return a new product id', async function () {
      const newProduct = {
        name: 'Capa da invisibilidade',
      }
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await productsModel.addNewProduct(newProduct);

      expect(result).to.be.equal(4);

    })
  })

  describe('Update a product', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return the correct product name after update it', async function () {
      const updatedProduct = {
        name: 'Capa da invisibilidade',
      }

      const updateProductId = 1;
      sinon.stub(connection, 'execute').resolves({ id: updateProductId, name: updatedProduct });

      const result = await productsModel.updateProduct(updateProductId, updatedProduct);

      expect(result).to.be.deep.equal({ id: updateProductId, name: updatedProduct });

    })
  });

  describe('Delete a product', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return undefined', async function () {
      const productToDelete = 1;

      // const updateProductId = 1;
      sinon.stub(connection, 'execute').resolves([{ deleteRows: 1}]);

      const result = await productsModel.deleteProduct(productToDelete);

      expect(result).to.be.undefined;

    })
  });
});