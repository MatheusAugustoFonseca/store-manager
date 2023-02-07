const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/salesModel');
const { connection } = require('../../../src/models/connection');
const salesMock = require('./mocks/sales.model.mock');
const { expect } = chai;

describe('Sales Model', function () {
  describe('List all sales', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Should return all sales', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock]);

      const result = await salesModel.getAll();

      expect(result).to.be.deep.equal(salesMock);
    });
  });
  describe('Get sale by id', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return the correct sale by an unique id', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock[1]]);

      const result = await salesModel.findById(2);

      expect(result).to.be.deep.equal(salesMock[1]);

    })
  });
  // describe('Add new product', function () {
  //    afterEach(function () {
  //     sinon.restore();
  //   });
  //   it('Should return a new product id', async function () {
  //     const newProduct = {
  //       name: 'Capa da invisibilidade',
  //     }
  //     sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

  //     const result = await productsModel.addNewProduct(newProduct);

  //     expect(result).to.be.equal(4);

  //   })
  // })
  describe('Delete a sale', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return undefined', async function () {
      const saleToDelete = 1;

      // const updateProductId = 1;
      sinon.stub(connection, 'execute').resolves([{ deleteRows: 1}]);

      const result = await salesModel.deleteSales(saleToDelete);

      expect(result).to.be.undefined;

    })
  });
});